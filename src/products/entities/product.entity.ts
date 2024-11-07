import { ApiProperty } from "@nestjs/swagger";
import { Provider } from "src/providers/entities/provider.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    productId: string;

    @ApiProperty({
        default: "Refresco Patito"
    })
    @Column({type: "text"})
    productName: string;

    @ApiProperty({
        default: "29"
    })
    @Column({type: "float"})
    price: number;

    @ApiProperty({
        default: "2"
    })
    @Column({type: "int"})
    countSeal: number;
    
    @ManyToOne(() => Provider, (provider) => provider.products, {
        eager: true,
    })
    provider: Provider | string
}
