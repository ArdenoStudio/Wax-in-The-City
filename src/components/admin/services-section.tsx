import { seedServices, updateService } from "@/app/admin/actions";
import { getAdminServices } from "@/lib/service-content";
import { isSupabaseAuthConfigured } from "@/lib/admin-access";
import { isDbConfigured } from "@/lib/db";
import { SERVICE_CATEGORIES } from "@/lib/site";
import { formatLKRFrom } from "@/lib/utils";
import {
  AdminFieldLabel,
  AdminPlate,
  AdminStatusMessage,
  ADMIN_INPUT_CLASS,
  ADMIN_PRIMARY_BUTTON_CLASS,
  ADMIN_SELECT_CLASS,
} from "@/components/admin/primitives";

const CATEGORY_VALUES = SERVICE_CATEGORIES.map((category) => category.slug);

export async function ServicesSection() {
  const dbReady = isDbConfigured() || isSupabaseAuthConfigured();
  const services = dbReady ? await getAdminServices() : [];

  return (
    <div className="grid gap-5">
      {!dbReady && (
        <AdminStatusMessage tone="error">
          Database credentials must be configured to enable service editing.
        </AdminStatusMessage>
      )}

      {dbReady && services.length === 0 && (
        <AdminPlate>
          <h2 className="font-serif text-h3 text-cream text-balance">
            No services in database yet
          </h2>
          <p className="mt-2 max-w-2xl text-body-sm text-warm-grey text-pretty">
            Seed the current static menu into the services table, then edit prices from this page.
          </p>
          <form action={seedServices} className="mt-5">
            <button type="submit" className={ADMIN_PRIMARY_BUTTON_CLASS}>
              Seed current service menu
            </button>
          </form>
        </AdminPlate>
      )}

      {services.map((service) => (
        <AdminPlate key={service.id}>
          <form action={updateService}>
            <input type="hidden" name="id" value={service.id} />
            <div className="grid gap-5 lg:grid-cols-[1fr_140px_150px]">
              <AdminFieldLabel label="Service">
                <input name="name" defaultValue={service.name} className={ADMIN_INPUT_CLASS} />
              </AdminFieldLabel>
              <AdminFieldLabel label="Price">
                <input
                  name="priceFrom"
                  type="number"
                  min="0"
                  defaultValue={service.priceFrom}
                  className={ADMIN_INPUT_CLASS}
                />
              </AdminFieldLabel>
              <AdminFieldLabel label="Duration">
                <input name="duration" defaultValue={service.duration} className={ADMIN_INPUT_CLASS} />
              </AdminFieldLabel>
            </div>

            <div className="mt-4 grid gap-5 lg:grid-cols-[180px_1fr_110px]">
              <AdminFieldLabel label="Category">
                <select
                  name="category"
                  defaultValue={service.category}
                  className={ADMIN_SELECT_CLASS}
                >
                  {CATEGORY_VALUES.map((slug) => {
                    const meta = SERVICE_CATEGORIES.find((category) => category.slug === slug);
                    return (
                      <option key={slug} value={slug}>
                        {meta?.name ?? slug}
                      </option>
                    );
                  })}
                </select>
              </AdminFieldLabel>
              <AdminFieldLabel label="Slug">
                <input name="slug" defaultValue={service.slug} className={ADMIN_INPUT_CLASS} />
              </AdminFieldLabel>
              <AdminFieldLabel label="Order">
                <input
                  name="sortOrder"
                  type="number"
                  min="0"
                  defaultValue={service.sortOrder}
                  className={ADMIN_INPUT_CLASS}
                />
              </AdminFieldLabel>
            </div>

            <AdminFieldLabel label="Description">
              <textarea
                name="description"
                defaultValue={service.description}
                rows={3}
                className={`${ADMIN_INPUT_CLASS} py-3`}
              />
            </AdminFieldLabel>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-4 text-body-sm text-warm-grey">
                <label className="inline-flex items-center gap-2">
                  <input
                    name="active"
                    type="checkbox"
                    defaultChecked={service.active}
                    className="h-4 w-4 accent-brand-action"
                  />
                  Visible on site
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    name="featured"
                    type="checkbox"
                    defaultChecked={service.featured}
                    className="h-4 w-4 accent-brand-action"
                  />
                  Featured
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-body-sm font-medium text-brand-light">
                  {formatLKRFrom(service.priceFrom)}
                </span>
                <button type="submit" className={ADMIN_PRIMARY_BUTTON_CLASS}>
                  Save service
                </button>
              </div>
            </div>
          </form>
        </AdminPlate>
      ))}
    </div>
  );
}
