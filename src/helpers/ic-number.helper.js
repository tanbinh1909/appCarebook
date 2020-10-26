export default class IcHelper {
  static extractICNumber(words) {
    if (!words || words.length <= 0) throw new Error("ID does not exist");
    let icNumber;
    words.forEach(word => {
      if (this.isICNumber(word)) {
        icNumber = word;
      }
    });
    if (!icNumber) throw new Error("ID does not exist");
    return icNumber;
  }

  static isICNumber(word) {
    return (
      (word.length === 12 && "" + parseInt(word) === word) ||
      this.isICNumber14(word)
    );
  }

  static isICNumber14(word) {
    if (word.length !== 14) return false;
    const ic12Number = word.replace(/[-—]/g, "");
    return ic12Number.length === 12 && "" + parseInt(ic12Number) === ic12Number;
  }
}
