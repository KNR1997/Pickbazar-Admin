import Input from "@/components/ui/input";
import Description from "@/components/ui/description";
import Card from "@/components/common/card";
import {
  FieldArray,
  FieldArrayMethodProps,
  FieldArrayPath,
  FieldArrayWithId,
  FieldValues,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useTranslation } from "next-i18next";
import Label from "@/components/ui/label";
import FileInput from "@/components/ui/file-input";
import Checkbox from "@/components/ui/checkbox/checkbox";
import { Config } from "@/config";
import { useRouter } from "next/router";
import Alert from "@/components/ui/alert";
import Button from "@/components/ui/button";

type IProps = {
  initialValues: any;
  batchIndex?: number;
  batchesFiled: FieldArrayWithId<
    FieldValues,
    FieldArrayPath<FieldValues>,
    "id"
  >[];
  batchAppend: (
    value:
      | Partial<FieldArray<FieldValues, FieldArrayPath<FieldValues>>>
      | Partial<FieldArray<FieldValues, FieldArrayPath<FieldValues>>>[],
    options?: FieldArrayMethodProps
  ) => void;
  batchRemove: (index?: number | number[]) => void;
};

export default function ProductSimpleForm({
  initialValues,
  batchesFiled,
  batchAppend,
  batchRemove,
}: IProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const { locale } = useRouter();
  const isTranslateProduct = locale !== Config.defaultLanguage;

  const is_digital = watch("is_digital");
  const is_external = watch("is_external");

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="my-5 flex flex-wrap sm:my-8">
      <Description
        title={t("form:form-title-simple-product-info")}
        details={`${
          initialValues
            ? t("form:item-description-edit")
            : t("form:item-description-add")
        } ${t("form:form-description-simple-product-info")}`}
        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            batchAppend({
              attribute: "",
              value: [],
            });
          }}
          type="button"
          className="text-sm md:text-base"
        >
          Add Batch
        </Button>
        {/* <Input
          label={`${t("form:input-label-price")}*`}
          {...register("price")}
          type="number"
          error={t(errors.price?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t("form:input-label-sale-price")}
          type="number"
          {...register("sale_price")}
          error={t(errors.sale_price?.message!)}
          variant="outline"
          className="mb-5"
        /> */}

        {/* <Input
          label={`${t('form:input-label-quantity')}*`}
          type="number"
          {...register('quantity')}
          error={t(errors.quantity?.message!)}
          variant="outline"
          className="mb-5"
          // Need discussion
          disabled={isTranslateProduct}
        /> */}

        {/* <Input
          label={`${t("form:input-label-sku")}*`}
          {...register("sku")}
          note={
            Config.enableMultiLang
              ? `${t("form:input-note-multilang-sku")}`
              : ""
          }
          error={t(errors.sku?.message!)}
          variant="outline"
          className="mb-5"
          disabled={isTranslateProduct}
        /> */}

        {/* <Input
          label={t("form:input-label-width")}
          {...register("width")}
          error={t(errors.width?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t("form:input-label-height")}
          {...register("height")}
          error={t(errors.height?.message!)}
          variant="outline"
          className="mb-5"
        /> */}
        {/* <Input
          label={t('form:input-label-length')}
          {...register('length')}
          error={t(errors.length?.message!)}
          variant="outline"
          className="mb-5"
        /> */}
        {/* <Checkbox
          {...register("is_digital")}
          id="is_digital"
          label={t("form:input-label-is-digital")}
          disabled={Boolean(is_external)}
          className="mb-5"
        /> */}

        {/* <Checkbox
          {...register("is_external")}
          id="is_external"
          label={t("form:input-label-is-external")}
          disabled={Boolean(is_digital)}
          className="mb-5"
        /> */}

        {/* {is_digital ? (
          <>
            <Label>{t("form:input-label-digital-file")}</Label>
            <FileInput
              name="digital_file_input"
              control={control}
              multiple={false}
              acceptFile={true}
              defaultValue={{}}
            />
            <Alert
              message={t("form:info-about-digital-product")}
              variant="info"
              closeable={false}
              className="mt-5 mb-5"
            />
            <input type="hidden" {...register(`digital_file`)} />
            {
              // @ts-ignore
              errors.digital_file_input && (
                <p className="my-2 text-xs text-red-500 text-start">
                  {
                    // @ts-ignore
                    t("form:error-digital-file-is-required")
                  }
                </p>
              )
            }
          </>
        ) : null} */}
        {/* {is_external ? (
          <div>
            <Input
              label={t("form:input-label-external-product-url")}
              {...register("external_product_url")}
              error={t(errors.external_product_url?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Input
              label={t("form:input-label-external-product-button-text")}
              {...register("external_product_button_text")}
              error={t(errors.external_product_button_text?.message!)}
              variant="outline"
              className="mb-5"
            />
          </div>
        ) : null} */}
      </Card>
      <Card className="w-full mt-5 p-0 md:p-0">
        {batchesFiled.map((field: any, index: number, batchId: any) => {
          return (
            <div
              key={`field-${index}`}
              className="border-b border-dashed border-border-200 p-5 last:border-0 md:p-8"
            >
              <div className="flex items-center justify-between">
                <input {...register(`batches.${index}.id`)} type="hidden" />
                <Input
                  label="Batch Number"
                  {...register(`batches.${index}.batch_number`)}
                  error={t(
                    // @ts-ignore
                    errors.batches?.[index]?.batch_number?.message
                  )}
                  variant="outline"
                  className="mb-5"
                />
                <Input
                  label="Manufacture Date"
                  {...register(`batches.${index}.manufacture_date`)}
                  type="Date"
                  defaultValue={getCurrentDate()}
                  error={t(
                    // @ts-ignore
                    errors.batches?.[index]?.manufacture_date?.message
                  )}
                  variant="outline"
                  className="mb-5"
                />
                <Input
                  label="Expiry Date"
                  {...register(`batches.${index}.expiry_date`)}
                  type="Date"
                  error={t(
                    // @ts-ignore
                    errors.batches?.[index]?.expiry_date?.message
                  )}
                  variant="outline"
                  className="mb-5"
                />
                <Input
                  label={`${t("form:input-label-price")}*`}
                  {...register(`batches.${index}.price`)}
                  type="number"
                  error={t(
                    // @ts-ignore
                    errors.batches?.[index]?.price?.message!
                  )}
                  variant="outline"
                  className="mb-5"
                />
                <Input
                  label="Cost"
                  {...register(`batches.${index}.cost`)}
                  type="number"
                  error={t(
                    // @ts-ignore
                    errors.batches?.[index]?.cost?.message!
                  )}
                  variant="outline"
                  className="mb-5"
                />
                <Input
                  label={t("form:input-label-sale-price")}
                  type="number"
                  {...register(`batches.${index}.sale_price`)}
                  error={t(
                    // @ts-ignore
                    errors.batches?.[index]?.sale_price?.message!
                  )}
                  variant="outline"
                  className="mb-5"
                />
                <Input
                  label={`${t("form:input-label-quantity")}*`}
                  type="number"
                  {...register(`batches.${index}.quantity`)}
                  error={t(
                    // @ts-ignore
                    errors.batches?.[index]?.quantity?.message!
                  )}
                  variant="outline"
                  className="mb-5"
                  // Need discussion
                  disabled={isTranslateProduct}
                />
                <button
                  onClick={() => batchRemove(index)}
                  type="button"
                  className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none"
                >
                  {t("form:button-label-remove")}
                </button>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
