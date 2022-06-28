import { PanelPlugin } from '@grafana/data';
import { ChartOptions } from './types';
import { ANSSChartsPanel } from './ANSSChartsPanel';
import { OrderBy } from './options/OrderBy'

export const plugin = new PanelPlugin<ChartOptions>(ANSSChartsPanel).setPanelOptions(builder => {
  return builder
  .addCustomEditor({
    path: 'OrderBy',
    name: 'Ordonner par',
    description: 'Ordonner les données par cette colonne',
    editor: OrderBy,
    id: "OrderBy",
    category: ["Options de tri"]
  })
  .addRadio({
    path: "OrderDirection",
    name: "Asc/Desc",
    description: "Direction de l'ordre",
    settings: {
      options: [{label: 'Ascendant', value: 'asc'}, {label: 'Descendant', value: 'desc'}]
    },
    defaultValue: 'asc',
    category: ['Options de tri']
  })
  .addColorPicker({
    path: "BackgroundColor",
    name: "Couleur de fond de la figure",
    defaultValue: 'white',
    category: ['Couleurs', 'Fond']
  })
  .addColorPicker({
    path: "TicksColor",
    name: "Couleur des Labels de l'axe radial",
    defaultValue: 'black',
    category: ['Couleurs', 'Textes']
  })
  .addColorPicker({
    path: "innerLabelsColor",
    name: "Couleurs des Labels",
    defaultValue: "black",
    category: ['Couleurs', 'Textes']
  })
  .addBooleanSwitch({
    path: "autoColoring",
    name: "Couleurs Auto?",
    description: "Si cette option est activée, les couleurs des arcs seront choisies automatiquement, sinon les gradients seront utilisés",
    defaultValue: false,
    category: ['Couleurs', 'Arcs']
  })
  .addColorPicker({
    path: "gradientColor1",
    name: "Couleur 1 du gradient",
    defaultValue: "blue",
    category: ['Couleurs', 'Arcs']
  })
  .addColorPicker({
    path: "gradientColor2",
    name: "Couleur 2 du gradient",
    defaultValue: "red",
    category: ['Couleurs', 'Arcs'],
  })
  .addNumberInput({
    path: "numTicks",
    name: "Nomber de divisions (Axe Radial)",
    defaultValue: 10,
    settings: {
      min: 0
    },
    category: ["Options du graphe"]
  })
  .addNumberInput({
    path: "fontSize",
    name: "Taille du texte en pixels",
    defaultValue: 12,
    settings: {
      min: 5,
      step: 1
    },
    category: ["Options du graphe"]
  })
  .addNumberInput({
    path: "arcMinRadius",
    name: "Espace Centrale du graphe",
    defaultValue: 50,
    settings: {
      min: 0
    },
    category: ["Options du graphe"]
  })
  .addNumberInput({
    path: "arcPadding",
    name: "Espace entre arcs",
    defaultValue: 10,
    settings: {
      min: 0
    },
    category: ["Options du graphe"]
  })


  .addNumberInput({
    path: "labelAxisX",
    name: "Position de la légende (Offset X)",
    defaultValue: 0,
    category: ["Options du graphe"]
  })
  .addNumberInput({
    path: "labelAxisY",
    name: "Position de la légende (Offset Y)",
    defaultValue: 0,
    category: ["Options du graphe"]
  })

  
})