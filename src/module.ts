import { FieldConfigProperty,PanelPlugin } from '@grafana/data';
import { ChartOptions } from './types';
import { ANSSChartsPanel } from './ANSSChartsPanel';

export const plugin = new PanelPlugin<ChartOptions>(ANSSChartsPanel).useFieldConfig({
  disableStandardOptions: [
    FieldConfigProperty.Min, 
    FieldConfigProperty.Max, 
    FieldConfigProperty.Unit,
    FieldConfigProperty.NoValue,
    FieldConfigProperty.Color,
    FieldConfigProperty.Decimals,
    FieldConfigProperty.DisplayName,
    FieldConfigProperty.Mappings,
    
  ]
}).setPanelOptions(builder => {
  return builder
  .addColorPicker({
    path: "BackgroundColor",
    name: "Couleur de fond de la figure",
    defaultValue: 'white',
    category: ['Couleurs']
  })
  .addColorPicker({
    path: "LegendTextColor",
    name: "Couleur du texte de la légende",
    defaultValue: 'black',
    category: ['Couleurs']
  })
})