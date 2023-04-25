import { useEffect, useMemo, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { IProduct } from "../types/types";
import { AppDispatch, RootState } from "../store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useSortProducts = (products: IProduct[]) => {
    const [selectedSort, setSelectedSort] = useState('priceLow');

    const sortedProducts: IProduct[] = useMemo(() => {
        const sortableProducts = [...products];

        sortableProducts.sort((a, b) => {
            switch (selectedSort) {
                case 'nameLow':
                    return a.name.localeCompare(b.name)
                    break;
                case 'nameHigh':
                    return -a.name.localeCompare(b.name)
                    break;
            
                case 'priceLow':
                    if (+a.price > +b.price) return 1;
                    if (+a.price < +b.price) return -1;
                    return 0 
                    break
                case 'priceHigh':
                    if (+a.price < +b.price) return 1;
                    if (+a.price > +b.price) return -1;
                    return 0 
                    break
                
                default:
                    return 0
                    break;
            }
        })

        return sortableProducts;

    }, [selectedSort, products]);

    return {
        selectedSort,
        setSelectedSort,
        sortedProducts
    }
}

export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
      useEffect(() => {
        const handleWindowResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      });

    return windowWidth;
}