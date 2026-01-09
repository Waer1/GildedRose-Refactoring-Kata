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

export class GildedRose {
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
    for (let i = 0; i < this.items.length; i++) {

      if (this.isNormalRose(this.items[i].name)) {
        this.items[i].quality = this.decreaseQuality(this.items[i])
      } else {
          this.items[i].quality = this.increaseQuality(this.items[i].quality)
          if (this.items[i].name == this.BACKSTAGE_PASSES) {
            this.items[i].quality = this.getBackstagePassesQuality(this.items[i])
          }
      }

      this.items[i].sellIn = this.decreaseSellIn(this.items[i]);

      if(this.items[i].sellIn >= 0) continue;

      if(this.items[i].name == this.AGED_BRIE) {
        this.items[i].quality = this.increaseQuality(this.items[i].quality)
      }
      else if (this.items[i].name == this.BACKSTAGE_PASSES) {
        this.items[i].quality = 0
      } else {
        this.items[i].quality = this.decreaseQuality(this.items[i])
      }

    }

    return this.items;
  }

  private increaseQuality(quantity: number) {
    if(quantity < this.MAX_QUALITY) {
      quantity = quantity + 1
    }
    return quantity
  }

  private decreaseSellIn(item: Item): number {
      if(item.name != this.SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      return item.sellIn
  }
  
  private decreaseQuality(item: Item) {
    if (item.name == this.SULFURAS) {
      return item.quality
    }
    if(item.quality > this.MIN_QUALITY) {
      item.quality = item.quality - 1
    }
    return item.quality
  }

  private getBackstagePassesQuality(item: Item) {
    let quality = item.quality;
    if (item.sellIn < this.BACKSTAGE_PASSES_PLUS_ONE_SELL_IN) {
      quality = this.increaseQuality(quality)
    }
    if (item.sellIn < this.BACKSTAGE_PASSES_PLUS_TWO_SELL_IN) {
      quality = this.increaseQuality(quality)
    }
    return quality
  }

  private isNormalRose(name: string) {
    return name != this.AGED_BRIE && name != this.BACKSTAGE_PASSES && name != this.SULFURAS;
  }
}
