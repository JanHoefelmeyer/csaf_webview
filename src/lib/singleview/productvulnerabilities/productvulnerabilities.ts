// This file is Free Software under the MIT License
// without warranty, see README.md and LICENSES/MIT.txt for details.
//
// SPDX-License-Identifier: MIT
//
// SPDX-FileCopyrightText: 2023 German Federal Office for Information Security (BSI) <https://www.bsi.bund.de>
// Software-Engineering: 2023 Intevation GmbH <https://intevation.de>

import {
  ProductStatusSymbol,
  type Vulnerability,
  type Product,
  type Relationship,
  type ProductStatus_t,
  type ProductStatus_t_Key
} from "./productvulnerabilitiestypes";

const generateProductVulnerabilities = (jsonDocument: any) => {
  const products = extractProducts(jsonDocument);
  let vulnerabilities = extractVulnerabilities(jsonDocument);
  vulnerabilities.sort((vuln1: Vulnerability, vuln2: Vulnerability) => {
    if (vuln1.cve < vuln2.cve) return -1;
    if (vuln1.cve > vuln2.cve) return 1;
    return 0;
  });
  const result = generateCrossTableFrom(products, vulnerabilities);
  return result;
};

const generateCrossTableFrom = (products: Product[], vulnerabilities: Vulnerability[]) => {
  let result = [];
  let header = ["Product", "Total result"];
  const getCVE = vulnerabilities.map((vulnerability: Vulnerability) => vulnerability.cve);
  header = header.concat(getCVE);
  result.push(header);
  let productLines = products.map((product: Product) => {
    let line = [product.name];
    line = line.concat(generateLineWith(product, vulnerabilities));
    return line;
  });
  productLines.sort((line1: string[], line2: string[]) => {
    if (line1[0] < line2[0]) return -1;
    if (line1[0] > line2[0]) return 1;
    return 0;
  });
  result = [...result, ...productLines];
  return result;
};

const generateLineWith = (product: Product, vulnerabilities: Vulnerability[]) => {
  const DUMMY_TOTAL = "N.A";
  const line: any = [DUMMY_TOTAL];
  vulnerabilities.forEach((vulnerability: Vulnerability) => {
    let column = "";
    if (vulnerability.fixed?.[product.product_id]) {
      column += ProductStatusSymbol.FIXED;
    }
    if (vulnerability.under_investigation?.[product.product_id]) {
      column += ProductStatusSymbol.UNDER_INVESTIGATION;
    }
    if (vulnerability.known_affected?.[product.product_id]) {
      column += ProductStatusSymbol.KNOWN_AFFECTED;
    }
    if (vulnerability.known_not_affected?.[product.product_id]) {
      column += ProductStatusSymbol.NOT_AFFECTED;
    }
    if (vulnerability.recommended?.[product.product_id]) {
      column += ProductStatusSymbol.RECOMMENDED;
    }
    line.push(column);
  });
  const calculateLineTotal = (line: string[]) => {
    return DUMMY_TOTAL;
  };
  line[0] = calculateLineTotal(line);
  return line;
};

const extractProducts = (jsonDocument: any): Product[] => {
  if (!jsonDocument.product_tree || !jsonDocument.product_tree.branches) {
    return [];
  }
  const productsFromBranches = jsonDocument.product_tree.branches.reduce(parseBranch, []);
  const productsFromRelationships: Product[] = getProductsFromRelationships(jsonDocument);
  return productsFromBranches.concat(productsFromRelationships);
};

const getProductsFromRelationships = (jsonDocument: any): Product[] => {
  if (!jsonDocument.product_tree.relationships) return [];
  return jsonDocument.product_tree.relationships.map((relationship: Relationship) => {
    return {
      product_id: relationship.full_product_name.product_id,
      name: relationship.full_product_name.name
    };
  });
};

const parseBranch = (acc: Product[], branch: any) => {
  if (branch.branches) {
    branch.branches.forEach((subbranch: any) => {
      acc.concat(parseBranch(acc, subbranch));
    });
  } else {
    if (isProduct(branch)) {
      acc.push({ product_id: branch.product.product_id, name: branch.product.name });
    }
  }
  return acc;
};

const isProduct = (branch: any) => {
  return branch.product && branch.product.product_id && branch.product.name;
};

const generateDictFrom = (productStatus: ProductStatus_t, section: ProductStatus_t_Key) => {
  return productStatus[section]!.reduce((o: any, n: string) => {
    o[n] = n;
    return o;
  }, {});
};

const extractVulnerabilities = (jsonDocument: any): Vulnerability[] => {
  if (!jsonDocument.vulnerabilities) {
    return [];
  }
  return jsonDocument.vulnerabilities.reduce((acc: Vulnerability[], vulnerability: any) => {
    if (!vulnerability.cve) {
      return acc;
    }
    const result: Vulnerability = {
      cve: vulnerability.cve
    };
    if (vulnerability.product_status) {
      if (vulnerability.product_status.known_affected) {
        result.known_affected = generateDictFrom(vulnerability.product_status, "known_affected");
      }
      if (vulnerability.product_status.fixed) {
        result.fixed = generateDictFrom(vulnerability.product_status, "fixed");
      }
      if (vulnerability.product_status.under_investigation) {
        result.under_investigation = generateDictFrom(
          vulnerability.product_status,
          "under_investigation"
        );
      }
      if (vulnerability.product_status.known_not_affected) {
        result.known_not_affected = generateDictFrom(
          vulnerability.product_status,
          "known_not_affected"
        );
      }
      if (vulnerability.product_status.recommended) {
        result.recommended = generateDictFrom(vulnerability.product_status, "recommended");
      }
    }
    acc.push(result);
    return acc;
  }, []);
};

export { extractProducts, extractVulnerabilities, generateProductVulnerabilities };
