import { Injectable, Inject } from '@angular/core'
import { Product } from './product.model'
import { ProductCategory } from './product-category.model'
import { productCategories } from './product-category.data'
import { products } from './product.data'
import { Http, Response, HttpModule } from '@angular/http';
//import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private http: Http) {

  }
  mySelectedProducts: Product[] = []

  getAllProducts(): Observable<Product[]> {

    /*  *************************** use this section if the return value is not an observable
         This section uses json server locally to emulate a server. Install the npm json server from:
         https://github.com/typicode/json-server */

    //  this.http
    //    .get("http://localhost:3000/productsData")
    //    .subscribe(data => console.log(data))

    /* *************************** use this section if the return value is an observable
         This section uses json server locally to emulate a server. Install the npm json server from:
         https://github.com/typicode/json-server */

    return this.http
     .get("http://teknolearn.com/projects/angular4-shopping-cart/product-data.json")
     .map((res: Response)  => res.json() as Product[]);


    /* *************************** use this section if the json server is not used locally. 
        To used a json server, install the json server from npm
        https://github.com/typicode/json-server */
        
  //  return undefined
  }

  getSelectedProducts(): Product[] {
    return this.mySelectedProducts
  }

  setSelectedProducts(myProduct: Product) {
    this.mySelectedProducts.push(myProduct)
  }

  getProductDetails(myProductId: number): Product {
    let pList: Product[] = products
    let myProduct: Product = pList.find(item => item.productId === myProductId)
    if (myProduct)
      return myProduct
    else
      undefined
  }

  getProductCategoryDetails(myCategoryId: number): ProductCategory {
    let cList: ProductCategory[] = productCategories
    let myCategory: ProductCategory = cList.find(item => item.productCategoryId === myCategoryId)
    if (myCategory)
      return myCategory
    else
      undefined
  }

}

