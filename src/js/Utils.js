import chroma from 'chroma-js';

export const Utils = {
    Populate(Fields, ignore = ['id']) {
        let that = this
        let series = []
        let labels = []
        let titles = []
        for (let i = 0; i < Fields.length; i++) {
            let FieldNameRaw = Fields[i].name
            let currentField = FieldNameRaw.toLowerCase()
            if (currentField == 'label') {
                labels = Fields[i].values.buffer
            } else {
                if (!ignore.includes(currentField)) {
                    titles.push(FieldNameRaw)
                    series.push(Fields[i].values.buffer)
                }
            }
        }

        return { labels, titles, series }
    },
    Colors(Colors, ValuesNumber) {
        return chroma.scale(Colors).colors(ValuesNumber)

    }
}