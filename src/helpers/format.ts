export function formatCurrency(value: number): string {
	return new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(value);
}

export function parseCurrency(value: string): number {
	const numericString = value.replace(/[^0-9.]/g, "");
	return parseFloat(numericString) || 0;
}
