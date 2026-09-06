import { seedServices, updateService, createService, deleteService } from "@/app/admin/actions";
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
import { Plus, Trash2, Sparkles } from "lucide-react";

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

      {dbReady && (
        <details className="rounded-card border border-cream/10 bg-cream/[0.03] p-4">
          <summary className="flex cursor-pointer items-center justify-between font-serif text-body-lg text-cream">
            <span className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-brand-light" />
              Add New Treatment / Spa Ritual
            </span>
            <span className="text-caption text-warm-grey">Click to expand</span>
          </summary>
          <form action={createService} className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminFieldLabel label="Service Name">
                <input name="name" required placeholder="e.g. Royal Moroccan Hammam Ritual" className={`${ADMIN_INPUT_CLASS} h-10`} />
              </AdminFieldLabel>
              <AdminFieldLabel label="Category">
                <select name="category" defaultValue="moroccan" className={`${ADMIN_SELECT_CLASS} h-10`}>
                  {CATEGORY_VALUES.map((slug) => {
                    const meta = SERVICE_CATEGORIES.find((c) => c.slug === slug);
                    return (
                      <option key={slug} value={slug}>
                        {meta?.name ?? slug}
                      </option>
                    );
                  })}
                </select>
              </AdminFieldLabel>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <AdminFieldLabel label="Starting Price (LKR)">
                <input name="priceFrom" type="number" min="0" required placeholder="12500" className={`${ADMIN_INPUT_CLASS} h-10`} />
              </AdminFieldLabel>
              <AdminFieldLabel label="Duration">
                <input name="duration" required placeholder="e.g. 60 mins" className={`${ADMIN_INPUT_CLASS} h-10`} />
              </AdminFieldLabel>
              <AdminFieldLabel label="Custom Slug (Optional)">
                <input name="slug" placeholder="e.g. royal-moroccan-hammam" className={`${ADMIN_INPUT_CLASS} h-10`} />
              </AdminFieldLabel>
            </div>
            <AdminFieldLabel label="Description">
              <textarea name="description" required rows={2} placeholder="Detailed protocol and treatment description..." className={`${ADMIN_INPUT_CLASS} py-2`} />
            </AdminFieldLabel>
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-body-sm text-warm-grey">
                <input name="featured" type="checkbox" className="h-4 w-4 accent-brand-action" />
                Featured on Homepage
              </label>
              <button type="submit" className={ADMIN_PRIMARY_BUTTON_CLASS}>
                Add Service to Menu
              </button>
            </div>
          </form>
        </details>
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

          <form action={deleteService} className="mt-3 flex justify-end border-t border-cream/5 pt-2">
            <input type="hidden" name="id" value={service.id} />
            <button
              type="submit"
              className="inline-flex items-center gap-1 text-caption text-warm-grey hover:text-error transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete Service
            </button>
          </form>
        </AdminPlate>
      ))}
    </div>
  );
}
