  "use client";
  import LayoutComponent from "@/app/components/layout/layoutComponent";
  import { useParams } from "next/navigation";
  import { useForm } from "react-hook-form";
  import { useFetchProductById } from "../../../../../../lib/calledAPI/service/serviceApiProduct";
  import { useMemo, useEffect,useRef } from "react";
  import { useFetchCategoryProduct } from "../../../../../../lib/calledAPI/service/serviceApiCategory";
  import { useFetchSuplier } from "../../../../../../lib/calledAPI/service/serviceApiSupplier";
  import { useFetchInventory } from "../../../../../../lib/calledAPI/service/serviceApiInventory";
  import FormRenderer from "@/app/components/items/formRender";
  import { formDataProduct } from "@/app/components/items/formTemplate";
  import { injectOptionForm } from "@/app/utils/formUtils";
  import { injectMultipleOptionsForm } from "@/app/utils/formUtils";
  import { Product } from "../../../../../../models/productModel/productModel";
  import { useUpdateProduct } from "../../../../../../lib/calledAPI/service/serviceApiProduct";
  import { useRouter } from "next/navigation";
  import { toast } from "sonner";
  import { useSession } from "next-auth/react";
  import Button from "@/app/components/items/button";

  export default function UpdateProductPage() {
    const params = useParams();
    const router = useRouter();
    const id = typeof params?.id === "string" ? params.id : undefined;
    
    // hooks should always be called and hook posisition must be at the top of the component
    const {data:session} = useSession();
    const {register, handleSubmit, reset, setValue,control, formState: {errors}} = useForm<Product>();
    // @ts-ignore
    const {data : productData,isLoading : isLoadingProduct,isError : isErrorProduct } = useFetchProductById(id , session?.user.role);
    const {data : categoryData, isLoading : isLoadingCategory, isError : isErrorCategory} = useFetchCategoryProduct();
    const {data : supplierData, isLoading : isLoadingSupplier, isError : isErrorSupplier} = useFetchSuplier();
    const {data : inventoryData, isLoading : isLoadingInventory, isError : isErrorInventory} = useFetchInventory();
    
    const categories = categoryData?.map((item:any) => ({
        label: item.category_name,
        value: item.id_category,
    })) || [];

    const suppliers = supplierData?.map((item:any) => ({
        label: item.supplier_name,
        value: item.id_supplier,
    })) ||[];

    const inventory = inventoryData?.map((item:any) => ({
        label: item.location,
        value: item.id_inventory,
    })) || []; 
    
    const updatedForm = useMemo(()=>{
      // @ts-ignore
      const formWithOption =  injectMultipleOptionsForm(formDataProduct, [
        { name: "id_category", options : categories},
        {name : "id_supplier", options : suppliers}, 
        {name : "id_inventory", options : inventory},
      ]);

      return formWithOption.map((field => {
        if(field.name === "barcode" && productData?.data.barcode){
          return {...field, readOnly : true};
        }
        if(field.name === "hpp" && session?.user?.role !== "owner"){
          return {...field, readOnly : true};
        }
        return field;
      }))
    }, [categories, suppliers, inventory]); // this function will run if one of these dependecies data changes
     
    const oldProduct = productData?.data;
     
     // this part that do auto fill to the form when the page is loaded
    useEffect(() =>{
      if(oldProduct){
        reset(oldProduct);
      }
    },[oldProduct, reset]);

    const mutationUpdateProduct = useUpdateProduct(id , session?.user?.role);

   useEffect(()=>{
    if (isErrorProduct) toast.error("Gagal memuat data produk.");
    if (isErrorCategory) toast.error("Gagal memuat data kategori.");
    if (isErrorSupplier) toast.error("Gagal memuat data supplier.");
    if (isErrorInventory) toast.error("Gagal memuat data gudang.");
   },[isErrorProduct, isErrorCategory, isErrorSupplier, isErrorInventory]);

    // const onSubmit = async (data: Product) => {
    //     console.log("Product updated:", data);
    //     try{
    //         await mutationUpdateProduct.mutateAsync(data);
    //         router.push(`/product?toast=update-success&name=${encodeURIComponent(data.name)}`)
            
    //     }catch(error){
    //         toast.error(`Gagal memperbarui produk: ${"Maaf terjadi kesalahan silahkan refresh dan coba kembali."}`);
    //     }
    // };

    const onSubmit = (data: Product) => {
    mutationUpdateProduct.mutate(data, {
      onSuccess: () => {
        router.push(`/product/productPage`);
      },
    });
  };


    return (
      <LayoutComponent>
        <div className="text-black px-14 py-10">
          <header className="mb-3">
              <h1 className="text-black font-bold text-2xl">Perbarui Data Produk</h1>
              <p className="text-gray-500">Silahkan mengisi form data produk untuk perbarui data</p>
          </header>
          {/* Button */}
          <div className="flex justify-end">
                <Button title="perbarui status" href="/product/barcodeProduct" />
          </div>
          <div className="bg-white/85 rounded-xl shadow-md p-8 mt-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormRenderer<Product>
                  // @ts-ignore
                    formData={updatedForm}
                    register={register}
                    errors={errors}
                    control={control}
                    gridClassname="grid grid-cols-2 gap-8" 
                />

                {/* Submit Button */}
                <div className="flex justify-end gap-6 mt-12">
                    <Button title="Batal" onClick={reset} variant="delete"/>
                    <Button title="Simpan" type="submit" variant="submit"/>
                </div>
            </form>
          </div>
        </div>
      </LayoutComponent>
    );
  }

  // information
    //   useEffect(() =>{
    //   if(oldProduct){
    //     reset(oldProduct);
    //   }
    // },[oldProduct, reset]); 

    // 1. these mean if oldProduct or reset changes then run these useEffect again 
    // 2. different using next/link and router push :
    // - next/link : using for static navigation and SEO friendly but can't Navigate API action and can't run logic before navigation
    // - router.push : not SEO friendly but can navigate API also can create logic before navigation run