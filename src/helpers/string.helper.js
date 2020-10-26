export default class StringHelper {
    static fullStrDateVN(value) {
        let fields = value.split('/');
        return `Ngày ${fields[0]} tháng ${fields[1]} năm ${fields[2]}`;
    }
}