const fs = require('fs/promises');
const {join} = require('path');

class Collection {

  constructor(collectionName) {
    this.filePath = join(process.cwd(), 'data', collectionName + '.json');
  }

  list() {
    return this._readData();
  }

  async _readData() {
    const fileData = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(fileData);
  }

  async findOne(query) {
    return this._readData()
    .then(items => items.find(item => item.id === query.id));
  }

  _writeData(data) {
    return fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async insertOne(itemData) {
    const list = await this._readData();

    const number = Math.max(...list.map(hw => hw.number)) + 1;

    const newItem = {
      number,
      ...itemData,
      id: Math.random().toString(16).slice(-12) + Math.random().toString(16).slice(-12),
    };

    list.push(newItem);
    await this._writeData(list);
    return newItem;
  }

  async updateOne(itemId, update) {
    const items = await this._readData();
    const itemIndex = items.findIndex(({ id }) => id === itemId);
    if (itemIndex === -1) {
      throw new Error('item not found');
    }

    items[itemIndex] = Object.assign({}, items[itemIndex], update);
    await this._writeData(items);
    return items[itemIndex];
  }

  async deleteOne(removeId) {
    const notes = await this._readData();
    const updatedNotes = notes.filter(({ id }) => id !== removeId);
    return this._writeData(updatedNotes);
  }

}

module.exports = { Collection };