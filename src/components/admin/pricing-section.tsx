import {
  updateWaxPrice,
  updateWaxPackage,
  seedWaxPricingFromStatic,
} from "@/app/admin/dashboard-actions";
import { getAdminWaxPricing } from "@/lib/pricing-content";

import { isSupabaseAuthConfigured } from "@/lib/admin-access";
import { isDbConfigured } from "@/lib/db";
import {
  AdminFieldLabel,
  AdminPlate,
  AdminStatusMessage,
  ADMIN_INPUT_CLASS,
  ADMIN_PRIMARY_BUTTON_CLASS,
  ADMIN_SELECT_CLASS,
} from "@/components/admin/primitives";
import { Sparkles, Package, ShieldCheck } from "lucide-react";

export async function PricingSection() {
  const dbReady = isDbConfigured() || isSupabaseAuthConfigured();
  const { prices, packages } = dbReady
    ? await getAdminWaxPricing()
    : { prices: [], packages: [] };

  return (
    <div className="grid gap-8">
      {!dbReady && (
        <AdminStatusMessage tone="error">
          Database credentials must be configured to enable database-persisted wax pricing & packages.
        </AdminStatusMessage>
      )}

      {dbReady && prices.length === 0 && (
        <AdminPlate>
          <div className="flex items-center gap-2 text-brand-light">
            <Sparkles className="h-5 w-5" />
            <span className="text-caption font-semibold uppercase tracking-wider">Initialize Menu</span>
          </div>
          <h2 className="mt-2 font-serif text-h3 text-cream text-balance">
            No wax pricing records in database yet
          </h2>
          <p className="mt-2 max-w-2xl text-body-sm text-warm-grey text-pretty">
            Seed the full verified static pricing menu (all 18 treatment areas and 3 curated bundles)
            into the database so you can adjust prices without editing code.
          </p>
          <form action={seedWaxPricingFromStatic} className="mt-5">
            <button type="submit" className={ADMIN_PRIMARY_BUTTON_CLASS}>
              Seed Verified Wax Price Matrix & Packages
            </button>
          </form>
        </AdminPlate>
      )}

      {/* 1. Bundled Packages Editor */}
      {packages.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-brand-light" />
              <h2 className="font-serif text-h3 text-cream">Curated Bundle Packages</h2>
            </div>
            <span className="text-caption font-semibold uppercase tracking-wider text-warm-grey">
              {packages.length} Packages
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <AdminPlate key={pkg.id} className="flex flex-col justify-between">
                <form action={updateWaxPackage} className="space-y-4">
                  <input type="hidden" name="id" value={pkg.id} />

                  <AdminFieldLabel label="Package Name">
                    <input name="name" defaultValue={pkg.name} className={`${ADMIN_INPUT_CLASS} h-10`} />
                  </AdminFieldLabel>

                  <AdminFieldLabel label="Tag / Badge (Optional)">
                    <input
                      name="tag"
                      defaultValue={pkg.tag ?? ""}
                      placeholder="e.g. Most Popular"
                      className={`${ADMIN_INPUT_CLASS} h-10`}
                    />
                  </AdminFieldLabel>

                  <div className="grid grid-cols-2 gap-3">
                    <AdminFieldLabel label="Essential Price (LKR)">
                      <input
                        name="priceEssential"
                        type="number"
                        min="0"
                        defaultValue={pkg.priceEssential}
                        className={`${ADMIN_INPUT_CLASS} h-10`}
                      />
                    </AdminFieldLabel>

                    <AdminFieldLabel label="Premium Price (LKR)">
                      <input
                        name="pricePremium"
                        type="number"
                        min="0"
                        defaultValue={pkg.pricePremium}
                        className={`${ADMIN_INPUT_CLASS} h-10`}
                      />
                    </AdminFieldLabel>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <AdminFieldLabel label="Duration">
                      <input
                        name="duration"
                        defaultValue={pkg.duration}
                        className={`${ADMIN_INPUT_CLASS} h-10`}
                      />
                    </AdminFieldLabel>

                    <AdminFieldLabel label="Sort Order">
                      <input
                        name="sortOrder"
                        type="number"
                        min="0"
                        defaultValue={pkg.sortOrder}
                        className={`${ADMIN_INPUT_CLASS} h-10`}
                      />
                    </AdminFieldLabel>
                  </div>

                  <AdminFieldLabel label="Description">
                    <textarea
                      name="description"
                      defaultValue={pkg.description}
                      rows={2}
                      className={`${ADMIN_INPUT_CLASS} py-2`}
                    />
                  </AdminFieldLabel>

                  <AdminFieldLabel label="Inclusions (Comma separated)">
                    <input
                      name="inclusions"
                      defaultValue={pkg.inclusions.join(", ")}
                      className={`${ADMIN_INPUT_CLASS} h-10`}
                    />
                  </AdminFieldLabel>

                  <div className="flex items-center justify-between border-t border-cream/10 pt-3">
                    <label className="inline-flex items-center gap-2 text-caption text-warm-grey">
                      <input
                        name="active"
                        type="checkbox"
                        defaultChecked={pkg.active}
                        className="h-4 w-4 accent-brand-action"
                      />
                      Active on site
                    </label>

                    <button type="submit" className={ADMIN_PRIMARY_BUTTON_CLASS}>
                      Save Package
                    </button>
                  </div>
                </form>
              </AdminPlate>
            ))}
          </div>
        </div>
      )}

      {/* 2. Treatment Areas Price Matrix */}
      {prices.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-light" />
              <h2 className="font-serif text-h3 text-cream">Treatment Area & Product Pricing</h2>
            </div>
            <span className="text-caption font-semibold uppercase tracking-wider text-warm-grey">
              {prices.length} Treatment Areas
            </span>
          </div>

          <div className="grid gap-4">
            {prices.map((p) => (
              <AdminPlate key={p.id}>
                <form action={updateWaxPrice}>
                  <input type="hidden" name="id" value={p.id} />

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <AdminFieldLabel label="Treatment Area">
                      <input name="area" defaultValue={p.area} className={`${ADMIN_INPUT_CLASS} h-10`} />
                    </AdminFieldLabel>

                    <AdminFieldLabel label="Category">
                      <select name="category" defaultValue={p.category} className={`${ADMIN_SELECT_CLASS} h-10`}>
                        <option value="face">Face & Brows</option>
                        <option value="body">Body (Arms/Legs/Chest)</option>
                        <option value="intimate">Intimate (Brazilian/Combos)</option>
                      </select>
                    </AdminFieldLabel>

                    <AdminFieldLabel label="Brazil Gold (LKR)">
                      <input
                        name="biahuGold"
                        type="number"
                        min="0"
                        defaultValue={p.biahuGold ?? ""}
                        placeholder="Leave blank if N/A"
                        className={`${ADMIN_INPUT_CLASS} h-10`}
                      />
                    </AdminFieldLabel>

                    <AdminFieldLabel label="Rica Italy (LKR)">
                      <input
                        name="ricaWhiteChoc"
                        type="number"
                        min="0"
                        defaultValue={p.ricaWhiteChoc ?? ""}
                        placeholder="Leave blank if N/A"
                        className={`${ADMIN_INPUT_CLASS} h-10`}
                      />
                    </AdminFieldLabel>
                  </div>

                  <div className="mt-3 grid gap-4 sm:grid-cols-3">
                    <AdminFieldLabel label="Lycon Superberry (LKR)">
                      <input
                        name="lyconSuperberry"
                        type="number"
                        min="0"
                        defaultValue={p.lyconSuperberry ?? ""}
                        placeholder="Leave blank if N/A"
                        className={`${ADMIN_INPUT_CLASS} h-10`}
                      />
                    </AdminFieldLabel>

                    <AdminFieldLabel label="Lycon Pinkini (LKR)">
                      <input
                        name="lyconPinkini"
                        type="number"
                        min="0"
                        defaultValue={p.lyconPinkini ?? ""}
                        placeholder="Leave blank if N/A"
                        className={`${ADMIN_INPUT_CLASS} h-10`}
                      />
                    </AdminFieldLabel>

                    <AdminFieldLabel label="Lycon Aloe Vera (LKR)">
                      <input
                        name="lyconAloeVera"
                        type="number"
                        min="0"
                        defaultValue={p.lyconAloeVera ?? ""}
                        placeholder="Leave blank if N/A"
                        className={`${ADMIN_INPUT_CLASS} h-10`}
                      />
                    </AdminFieldLabel>
                  </div>

                  <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_120px]">
                    <AdminFieldLabel label="Special Protocol Note">
                      <input
                        name="note"
                        defaultValue={p.note ?? ""}
                        placeholder="e.g. Strict no double dipping protocol."
                        className={`${ADMIN_INPUT_CLASS} h-10`}
                      />
                    </AdminFieldLabel>

                    <AdminFieldLabel label="Sort Order">
                      <input
                        name="sortOrder"
                        type="number"
                        min="0"
                        defaultValue={p.sortOrder}
                        className={`${ADMIN_INPUT_CLASS} h-10`}
                      />
                    </AdminFieldLabel>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-cream/10 pt-3">
                    <label className="inline-flex items-center gap-2 text-caption text-warm-grey">
                      <input
                        name="active"
                        type="checkbox"
                        defaultChecked={p.active}
                        className="h-4 w-4 accent-brand-action"
                      />
                      Visible in Price Matrix
                    </label>

                    <div className="flex items-center gap-3">
                      <button type="submit" className={ADMIN_PRIMARY_BUTTON_CLASS}>
                        Save {p.area}
                      </button>
                    </div>
                  </div>
                </form>
              </AdminPlate>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
