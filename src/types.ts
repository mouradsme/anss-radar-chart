type Orders = 'asc' | 'desc'
export interface ChartOptions {
    OrderBy       : any;
    OrderDirection  : Orders;
    numTicks      : number;
    arcMinRadius  : number;
    arcPadding    : number;
    TicksColor    : any;
    BackgroundColor: any;
    fontSize: number;
    labelAxisX: number;
    labelAxisY: number;
    innerLabelsColor: any;
    gradientColor1: any;
    gradientColor2: any;
    autoColoring: boolean;
}
