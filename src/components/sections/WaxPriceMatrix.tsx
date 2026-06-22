import {
  WAX_PRICE_ROWS,
  WAX_PACKAGES,
  WAX_PRODUCTS,
  productsForRow,
  type WaxPriceRow,
} from "@/lib/pricing";
import { formatLKR } from "@/lib/utils";

function PriceCell({ price }: { price?: number }) {
  if (price == null) return <span className="text-warm-grey/40">—</span>;
  return <span className="font-medium tabular-nums text-warm">{formatLKR(price)}</span>;
}

function WaxTable({
  title,
  rows,
  showAllProducts = false,
}: {
  title: string;
  rows: WaxPriceRow[];
  showAllProducts?: boolean;
}) {
  const activeProducts = showAllProducts
    ? WAX_PRODUCTS
    : WAX_PRODUCTS.filter((p) =>
        rows.some((row) => row.prices[p.id] != null)
      );

  return (
    <div>
      <h3 className="mb-4 font-serif text-h4 font-medium text-warm">{title}</h3>
      <div className="overflow-x-auto rounded-card border border-warm-border/80 bg-white/52 shadow-[0_16px_42px_rgba(39,19,21,0.05)]">
        <table className="w-full min-w-[640px] border-collapse text-body-sm">
          <thead>
            <tr className="border-b border-warm-border/60 bg-brand-mist/40">
              <th className="sticky left-0 z-10 bg-brand-mist/95 px-4 py-3 text-left font-semibold text-warm backdrop-blur-sm">
                Area
              </th>
              {activeProducts.map((product) => (
                <th
                  key={product.id}
                  className="px-3 py-3 text-right font-semibold text-warm-grey"
                >
                  <span className="hidden sm:inline">{product.label}</span>
                  <span className="sm:hidden">{product.short}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const rowProducts = showAllProducts
                ? activeProducts.map((p) => p.id)
                : productsForRow(row);

              return (
                <tr
                  key={row.area}
                  className={index % 2 === 0 ? "bg-white/30" : "bg-cream/40"}
                >
                  <td className="sticky left-0 z-10 border-r border-warm-border/40 bg-inherit px-4 py-3">
                    <div className="font-medium text-warm">{row.area}</div>
                    {row.note && (
                      <div className="mt-0.5 text-caption text-warm-grey">{row.note}</div>
                    )}
                  </td>
                  {activeProducts.map((product) => (
                    <td key={product.id} className="px-3 py-3 text-right">
                      {rowProducts.includes(product.id) ? (
                        <PriceCell price={row.prices[product.id]} />
                      ) : (
                        <span className="text-warm-grey/40">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function WaxPriceMatrix() {
  return (
    <div className="space-y-10">
      <WaxTable title="Waxing by area" rows={WAX_PRICE_ROWS} />
      <WaxTable title="Package bundles" rows={WAX_PACKAGES} showAllProducts />
      <p className="text-body-sm text-warm-grey">
        Prices vary by wax product. Your therapist will recommend the best option for your skin during booking.
      </p>
    </div>
  );
}
