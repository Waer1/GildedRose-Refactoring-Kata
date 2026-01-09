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
}

class RegualrRoseItem extends RoseItem {
  updateQuality(): void {
    this.decreaseQuality(1);
  }
}

class SulfurasRoseItem extends RoseItem {
  updateQuality(): void {
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


export class GildedRose {

  private getRoseClass(item: Item): RoseItem {
    if (item.name == this.SULFURAS) {
      return new SulfurasRoseItem(item);
    }
    if (item.name == this.AGED_BRIE) {
      return new AgedBrieRoseItem(item);
    }
    return new RegualrRoseItem(item);
  }


  private readonly AGED_BRIE = 'Aged Brie';
  private readonly BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
  private readonly SULFURAS = 'Sulfuras, Hand of Ragnaros';
  private readonly MAX_QUALITY = 50;
  private readonly MIN_QUALITY = 0;
  private readonly BACKSTAGE_PASSES_PLUS_ONE_SELL_IN = 11;
  private readonly BACKSTAGE_PASSES_PLUS_TWO_SELL_IN = 6;


  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {

    for (let item of this.items) {
      const normalRoseItem = this.getRoseClass(item);

      if (this.isNormalRose(item.name)) {
        normalRoseItem.updateQuality();
      } else if (item.name == this.AGED_BRIE) {
        item.quality = this.increaseQuality(item.quality)
      } else if (item.name == this.BACKSTAGE_PASSES) {
        item.quality = this.increaseQuality(item.quality)
        if (item.sellIn < this.BACKSTAGE_PASSES_PLUS_ONE_SELL_IN) {
          item.quality = this.increaseQuality(item.quality)
        }
        if (item.sellIn < this.BACKSTAGE_PASSES_PLUS_TWO_SELL_IN) {
          item.quality = this.increaseQuality(item.quality)
        }
      } else if (item.name == this.SULFURAS) {
        normalRoseItem.updateQuality();
      }
    }

    for (let item of this.items) {
      item.sellIn = this.decreaseSellIn(item);
    }

    for (let item of this.items) {
      const normalRoseItem = this.getRoseClass(item);

      if (item.sellIn >= 0) continue;

      if (item.name == this.AGED_BRIE) {
        item.quality = this.increaseQuality(item.quality)
      }
      else if (item.name == this.BACKSTAGE_PASSES) {
        item.quality = 0
      } else if (item.name == this.SULFURAS) {
        normalRoseItem.updateQuality();
      } else if (this.isNormalRose(item.name)) {
        normalRoseItem.updateQuality();
      }

    }

    return this.items;
  }

  private increaseQuality(quantity: number) {
    if (quantity < this.MAX_QUALITY) {
      quantity = quantity + 1
    }
    return quantity
  }

  private decreaseSellIn(item: Item): number {
    if (item.name != this.SULFURAS) {
      item.sellIn = item.sellIn - 1;
    }
    return item.sellIn
  }


  private isNormalRose(name: string) {
    return name != this.AGED_BRIE && name != this.BACKSTAGE_PASSES && name != this.SULFURAS;
  }
}
