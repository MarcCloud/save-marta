export type BusRoute = {
	id: number;
	number: string;
	name: string;
	color: string;
};

export type Bus = {
	unit: number;
	lat: string;
	long: string;
	route: string;
	timepoint: string;
};
