import { getCatalogItemById, type CatalogProduct } from "@/data/catalog";

export interface CartLineInput {
  productId: string;
  quantity: number;
}

export interface ResolvedCartLine {
  product: CatalogProduct;
  quantity: number;
  initialUnitTotal: number;
  initialLineTotal: number;
  recurringUnitTotal: number;
  recurringLineTotal: number;
}

export interface CartSummary {
  oneTimeLines: ResolvedCartLine[];
  monthlyLines: ResolvedCartLine[];
  annualLines: ResolvedCartLine[];
  oneTimeTotal: number;
  monthlyInitialTotal: number;
  annualInitialTotal: number;
  dueTodayTotal: number;
  futureMonthlyTotal: number;
  futureAnnualTotal: number;
  hasMixedCycles: boolean;
  requiresRecurringAuthorization: boolean;
  orchestrationMode:
    | "empty"
    | "one_time_only"
    | "single_monthly_subscription"
    | "single_annual_subscription"
    | "coordinated_multi_cycle";
}

export function calculateCartFromCatalog(inputs: CartLineInput[]): CartSummary {
  const oneTimeLines: ResolvedCartLine[] = [];
  const monthlyLines: ResolvedCartLine[] = [];
  const annualLines: ResolvedCartLine[] = [];

  for (const input of inputs) {
    if (!input.productId || input.quantity <= 0) continue;
    const product = getCatalogItemById(input.productId);
    if (!product || product.availability !== "online-ready" || product.initialPrice === null) {
      continue;
    }

    const qty = Math.max(1, Math.floor(input.quantity));
    const initialUnit = product.initialPrice;
    const recurringUnit = product.recurringPrice ?? 0;

    const line: ResolvedCartLine = {
      product,
      quantity: qty,
      initialUnitTotal: initialUnit,
      initialLineTotal: initialUnit * qty,
      recurringUnitTotal: recurringUnit,
      recurringLineTotal: recurringUnit * qty,
    };

    if (product.chargeMode === "one_time") {
      oneTimeLines.push(line);
    } else if (product.billingInterval === "month") {
      monthlyLines.push(line);
    } else if (product.billingInterval === "year") {
      annualLines.push(line);
    }
  }

  const sumInitial = (arr: ResolvedCartLine[]) =>
    arr.reduce((acc, l) => acc + l.initialLineTotal, 0);
  const sumRecurring = (arr: ResolvedCartLine[]) =>
    arr.reduce((acc, l) => acc + l.recurringLineTotal, 0);

  const oneTimeTotal = sumInitial(oneTimeLines);
  const monthlyInitialTotal = sumInitial(monthlyLines);
  const annualInitialTotal = sumInitial(annualLines);
  const dueTodayTotal = oneTimeTotal + monthlyInitialTotal + annualInitialTotal;

  const futureMonthlyTotal = sumRecurring(monthlyLines);
  const futureAnnualTotal = sumRecurring(annualLines);

  const cycleCount =
    (oneTimeLines.length > 0 ? 1 : 0) +
    (monthlyLines.length > 0 ? 1 : 0) +
    (annualLines.length > 0 ? 1 : 0);

  const hasMixedCycles =
    (monthlyLines.length > 0 && annualLines.length > 0) ||
    (oneTimeLines.length > 0 && (monthlyLines.length > 0 || annualLines.length > 0));

  let orchestrationMode: CartSummary["orchestrationMode"] = "empty";
  if (cycleCount === 1) {
    if (oneTimeLines.length > 0) orchestrationMode = "one_time_only";
    else if (monthlyLines.length > 0) orchestrationMode = "single_monthly_subscription";
    else if (annualLines.length > 0) orchestrationMode = "single_annual_subscription";
  } else if (cycleCount > 1) {
    orchestrationMode = "coordinated_multi_cycle";
  }

  return {
    oneTimeLines,
    monthlyLines,
    annualLines,
    oneTimeTotal,
    monthlyInitialTotal,
    annualInitialTotal,
    dueTodayTotal,
    futureMonthlyTotal,
    futureAnnualTotal,
    hasMixedCycles,
    requiresRecurringAuthorization: monthlyLines.length > 0 || annualLines.length > 0,
    orchestrationMode,
  };
}
