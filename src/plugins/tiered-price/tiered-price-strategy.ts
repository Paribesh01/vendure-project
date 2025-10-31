import { OrderItemPriceCalculationStrategy, PriceCalculationResult, ProductVariant, RequestContext } from '@vendure/core';

type PriceTier = {
    minQty: number;
    maxQty: number;
    price: number;
};

export class TieredPriceCalculationStrategy implements OrderItemPriceCalculationStrategy {
    async calculateUnitPrice(
        ctx: RequestContext,
        productVariant: ProductVariant,
        orderLineCustomFields: Record<string, any>,
        order: any,
        quantity: number,
    ): Promise<PriceCalculationResult> {
        const rawTiers = (productVariant.customFields as any)?.priceTiers as unknown;

        let unitPrice = productVariant.listPrice;

        if (Array.isArray(rawTiers)) {
            const tiers = rawTiers.filter(
                (t: any) =>
                    typeof t?.minQty === 'number' &&
                    typeof t?.maxQty === 'number' &&
                    typeof t?.price === 'number'
            ) as PriceTier[];

            const match = tiers.find(t => quantity >= t.minQty && quantity <= t.maxQty);
            if (match) {
                unitPrice = match.price;
            }
        }

        return {
            price: unitPrice,
            priceIncludesTax: productVariant.listPriceIncludesTax,
        };
    }
}