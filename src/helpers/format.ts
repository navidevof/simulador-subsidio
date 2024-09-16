export const formatCurrency = (price: number) => {
	const newPrice = price.toString();
	const formattedValue = parseInt(newPrice).toLocaleString("es-CO", {
		style: "currency",
		currency: "COP",
		minimumFractionDigits: 0,
	});
	return formattedValue + " COP";
};
