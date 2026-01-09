export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


interface RoseItem {
  updateSellIn(): void;
  increaseQuality(amount: number): void;
  decreaseQuality(amount: number): void;
  updateQuality(): void;
}

abstract class RoseItem implements RoseItem {
  private readonly item: Item;
  private readonly MAX_QUALITY = 50;
  private readonly MIN_QUALITY = 0;

  constructor(item: Item) {
    this.item = item;
  }

  updateSellIn() {
    this.item.sellIn = this.item.sellIn - 1;
  }

  increaseQuality(amount: number) {
    this.item.quality = Math.min(this.item.quality + amount, this.MAX_QUALITY)
  }

  decreaseQuality(amount: number) {
    this.item.quality = Math.max(this.item.quality - amount, this.MIN_QUALITY)
  }

  getSellIn(): number {
    return this.item.sellIn;
  }

  setQuality(value: number) {
    this.item.quality = value;
  }
}

class RegualrRoseItem extends RoseItem {
  updateQuality(): void {
    this.decreaseQuality(1);
    if (this.getSellIn() < 0) {
      this.decreaseQuality(1);
    }
  }
}

class SulfurasRoseItem extends RoseItem {
  updateQuality(): void {
  }
  updateSellIn(): void {
  }
}


class AgedBrieRoseItem extends RoseItem {
  updateQuality(): void {
    if(this.getSellIn() < 0) {
      this.increaseQuality(2);
    } else {
      this.increaseQuality(1);
    }
  }
}

class BackstagePassesRoseItem extends RoseItem {
  private readonly BACKSTAGE_PASSES_PLUS_ONE_SELL_IN = 10;
  private readonly BACKSTAGE_PASSES_PLUS_TWO_SELL_IN = 5;

  updateQuality(): void {
    if (this.getSellIn() < 0) {
      this.setQuality(0);
    } else if (this.getSellIn() < this.BACKSTAGE_PASSES_PLUS_TWO_SELL_IN) {
      this.increaseQuality(3);
    } else if (this.getSellIn() < this.BACKSTAGE_PASSES_PLUS_ONE_SELL_IN) {
      this.increaseQuality(2);
    } else {
      this.increaseQuality(1);
    }
  }
}

class Conjured extends RoseItem {
  updateQuality(): void {
    this.decreaseQuality(2);
    if (this.getSellIn() < 0) {
      this.decreaseQuality(2);
    }
  }
}

export class GildedRose {

  private getRoseClass(item: Item): RoseItem {
    if (item.name == this.SULFURAS) {
      return new SulfurasRoseItem(item);
    }
    if (item.name == this.AGED_BRIE) {
      return new AgedBrieRoseItem(item);
    }
    if (item.name == this.BACKSTAGE_PASSES) {
      return new BackstagePassesRoseItem(item);
    }
    if (item.name == this.CONJURED) {
      return new Conjured(item);
    }
    return new RegualrRoseItem(item);
  }


  private readonly AGED_BRIE = 'Aged Brie';
  private readonly BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
  private readonly SULFURAS = 'Sulfuras, Hand of Ragnaros';
  private readonly CONJURED = 'Conjured';


  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {

    for (let item of this.items) {
      const normalRoseItem = this.getRoseClass(item);
      normalRoseItem.updateSellIn();
      normalRoseItem.updateQuality();
    }

    return this.items;
  }
}
