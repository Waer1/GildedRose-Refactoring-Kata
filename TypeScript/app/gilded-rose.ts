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
  

  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {

      if (this.isNormalRose(this.items[i].name)) {

        if (this.items[i].quality > 0) {
            this.items[i].quality = this.items[i].quality - 1
        }

      } else {

        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == this.BACKSTAGE_PASSES) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }

      }


      if (this.items[i].name != this.SULFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != this.AGED_BRIE) {
          if (this.items[i].name != this.BACKSTAGE_PASSES) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != this.SULFURAS) {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }



    }

    return this.items;
  }

  private isNormalRose(name: string) {
    return name != this.AGED_BRIE && name != this.BACKSTAGE_PASSES && name != this.SULFURAS;
  }
}
