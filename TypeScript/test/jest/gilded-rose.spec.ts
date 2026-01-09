import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('Normal item', () => {
    it('decreases quality and sellIn by 1 each day', () => {
      const gildedRose = new GildedRose([new Item('Normal Item', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);
    });

    it('degrades quality twice as fast after sell date passes', () => {
      const gildedRose = new GildedRose([new Item('Normal Item', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(18);
    });

    it('quality is never negative', () => {
      const gildedRose = new GildedRose([new Item('Normal Item', 5, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it('quality is never negative after sell date passes', () => {
      const gildedRose = new GildedRose([new Item('Normal Item', 0, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe('Aged Brie', () => {
    it('increases in quality as it gets older', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(21);
    });

    it('increases quality twice as fast after sell date passes', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(22);
    });
  });
});
