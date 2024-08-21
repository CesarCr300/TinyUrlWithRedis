import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_url')
export class UrlEntity {
  @PrimaryGeneratedColumn('increment', { name: 'int_id' })
  id: number;

  @Column({ name: 'vch_original_url', type: 'varchar', length: 255 })
  originalUrl: string;

  @Column({ name: 'vch_shorted_url', type: 'varchar', length: 255 })
  shortUrl: string;

  constructor(originalUrl: string, shortUrl: string) {
    this.originalUrl = originalUrl;
    this.shortUrl = shortUrl;
  }
}
