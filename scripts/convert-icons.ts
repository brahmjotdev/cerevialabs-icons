import { glob } from "glob";
import fs from "fs-extra";
import { existsSync } from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { transform } from "@svgr/core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SVG_DIR = path.join(__dirname, "../src/svg");
const ICONS_DIR = path.join(__dirname, "../src/components/icons");
const INDEX_FILE = path.join(__dirname, "../src/index.ts");

// Normalize filename: heart.svg -> Heart, heart-filled.svg -> HeartFilled
function normalizeName(filename: string): string {
  const nameWithoutExt = filename.replace(/\.svg$/i, "");
  const parts = nameWithoutExt.split("-");

  // Check if it's a filled icon
  const isFilled = parts[parts.length - 1] === "filled";

  if (isFilled) {
    // Remove "filled" from parts and capitalize
    const baseParts = parts.slice(0, -1);
    const pascalCase = baseParts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join("");
    return `${pascalCase}Filled`;
  } else {
    // Regular outline icon
    const pascalCase = parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join("");
    return pascalCase;
  }
}

// Check if component already exists
function componentExists(componentName: string): boolean {
  const componentPath = path.join(ICONS_DIR, `${componentName}.tsx`);
  return existsSync(componentPath);
}

// Convert SVG to React component using SVGR
async function convertSvgToComponent(
  svgPath: string,
  componentName: string,
  isFilled: boolean
): Promise<string> {
  const svgContent = await fs.readFile(svgPath, "utf-8");

  // Convert SVG to TSX using SVGR - we'll extract just the children
  const tsxCode = await transform(
    svgContent,
    {
      plugins: ["@svgr/plugin-jsx", "@svgr/plugin-prettier"],
      typescript: true,
      ref: false, // We handle ref in wrapper
      svgProps: false, // Don't add default SVG props
      replaceAttrValues: {
        "#000000": "currentColor",
        "#000": "currentColor",
        black: "currentColor",
      },
      removeViewBox: false,
    },
    { componentName: "Temp" }
  );

  // Extract the SVG children from the converted code
  // SVGR outputs a component, we need to extract the JSX children
  // The output format is typically: const Temp = () => <svg>...</svg>
  // We need to extract what's inside the <svg> tags
  let svgChildren = "";

  // Try to match the SVG content
  const svgMatch = tsxCode.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (svgMatch) {
    svgChildren = svgMatch[1].trim();
  } else {
    // If no match, try to extract JSX from the return statement
    const returnMatch = tsxCode.match(/return\s*\(([\s\S]*?)\)\s*;/);
    if (returnMatch) {
      const returnContent = returnMatch[1].trim();
      const innerSvgMatch = returnContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
      if (innerSvgMatch) {
        svgChildren = innerSvgMatch[1].trim();
      }
    }
  }

  // If still no children, try to extract any JSX elements (paths, circles, etc.)
  if (!svgChildren) {
    // Look for path, circle, rect, etc. elements
    const elementMatch = tsxCode.match(
      /(<(?:path|circle|rect|line|polyline|polygon|ellipse|g)[^>]*>[\s\S]*?<\/(?:path|circle|rect|line|polyline|polygon|ellipse|g)>)/
    );
    if (elementMatch) {
      svgChildren = elementMatch[1];
    }
  }

  // Determine which base component to use
  const BaseComponent = isFilled ? "FilledIcon" : "OutlineIcon";
  const basePropsType = isFilled ? "FilledIconProps" : "OutlineIconProps";

  // Create the wrapped component
  const wrappedComponent = `import * as React from "react";
import { ${BaseComponent} } from "../base/${isFilled ? "filled" : "outline"}-icon";
import type { ${basePropsType} } from "../../props/${isFilled ? "filled" : "outline"}-icon-props";

const ${componentName} = React.forwardRef<SVGSVGElement, ${basePropsType}>(
  (props, ref) => {
    return (
      <${BaseComponent} ref={ref} {...props}>
        ${svgChildren.trim()}
      </${BaseComponent}>
    );
  }
);

${componentName}.displayName = "${componentName}";

export { ${componentName} };
`;

  return wrappedComponent;
}

// Generate index.ts with all exports
async function generateIndexFile(componentNames: string[]): Promise<void> {
  const exports = componentNames
    .sort()
    .map((name) => `export { ${name} } from "./components/icons/${name}";`)
    .join("\n");

  const indexContent = `${exports}\n`;

  await fs.writeFile(INDEX_FILE, indexContent, "utf-8");
  console.log(
    `✓ Generated ${INDEX_FILE} with ${componentNames.length} exports`
  );
}

// Main function
async function main() {
  console.log("🔄 Starting icon conversion...\n");

  // Ensure icons directory exists
  await fs.ensureDir(ICONS_DIR);

  // Find all SVG files
  const svgFiles = await glob("*.svg", { cwd: SVG_DIR });

  if (svgFiles.length === 0) {
    console.log("⚠ No SVG files found in", SVG_DIR);
    return;
  }

  console.log(`Found ${svgFiles.length} SVG file(s)\n`);

  const convertedComponents: string[] = [];
  const skippedComponents: string[] = [];

  // Process each SVG file
  for (const svgFile of svgFiles) {
    const svgPath = path.join(SVG_DIR, svgFile);
    const componentName = normalizeName(svgFile);
    const isFilled = svgFile.includes("-filled.svg");

    // Check if component already exists
    if (componentExists(componentName)) {
      console.log(`⏭ Skipping ${componentName} (already exists)`);
      skippedComponents.push(componentName);
      continue;
    }

    try {
      // Convert SVG to component
      const componentCode = await convertSvgToComponent(
        svgPath,
        componentName,
        isFilled
      );

      // Write component file
      const componentPath = path.join(ICONS_DIR, `${componentName}.tsx`);
      await fs.writeFile(componentPath, componentCode, "utf-8");

      console.log(`✓ Converted ${svgFile} → ${componentName}.tsx`);
      convertedComponents.push(componentName);
    } catch (error) {
      console.error(`✗ Error converting ${svgFile}:`, error);
    }
  }

  // Get all component names (converted + existing)
  const allComponentNames = [
    ...convertedComponents,
    ...skippedComponents,
    // Also check for any existing components in the icons directory
    ...(await fs.readdir(ICONS_DIR))
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => path.basename(file, ".tsx")),
  ];

  // Remove duplicates
  const uniqueComponentNames = Array.from(new Set(allComponentNames));

  // Generate index.ts
  await generateIndexFile(uniqueComponentNames);

  console.log(`\n✨ Conversion complete!`);
  console.log(`   Converted: ${convertedComponents.length}`);
  console.log(`   Skipped: ${skippedComponents.length}`);
  console.log(`   Total components: ${uniqueComponentNames.length}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
