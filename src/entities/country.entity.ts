export class CountryEntity {
  name: string | null;
  code: string | null;
  emoji: string | null;
  unicode: string | null;
  image: string | null;

  constructor(country: Partial<CountryEntity> = {}) {
    this.name = country.name || null;
    this.code = country.code || null;
    this.emoji = country.emoji || null;
    this.unicode = country.unicode || null;
    this.image = country.image || null;
  }
}
