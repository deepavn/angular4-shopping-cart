import { Component, OnInit } from '@angular/core'
import { Product } from './product.model'
import { products } from './product.data'
import { ProductCategory } from "./product-category.model"
import { productCategories } from "./product-category.data"
import { ProductService } from "./product.service"
import { CartService } from '../cart/cart.service'
import { CartItem } from '../cart/cart-item.model'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'


@Component({
    selector: 'products-list',
    templateUrl: './product-list.html'
})

export class ProductListComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private router: Router, private productService: ProductService,
        private cartService: CartService) {
    }

    productCategoryList: ProductCategory[] = productCategories
    productCategoryTitle: string = "Select Category"
    productList: Product[] = products
    selectedProduct: Product
    products$: Observable<Product[]>
    selectedProductCategoryName: string
    selectedProductCategoryId: number

    selectedProductTitle: string = ""

    onSelect(myProduct: Product): void {
        this.selectedProduct = myProduct
        // display the product details in a different page
        this.router.navigate(['/products/product-details', myProduct.productId]);
    }

    onAddtoCart(myProduct: Product) {

        this.productService.setSelectedProducts(myProduct)

        // Add Selected Product to Cart
        let myCartItem: CartItem
        myCartItem = new CartItem()
        myCartItem.id = myProduct.productId
        myCartItem.name = myProduct.productName
        myCartItem.price = myProduct.price
        myCartItem.quantity = 1

        this.cartService.addToCart(myCartItem)

    }

    onSelect_getCat(myCat: ProductCategory): void {
        this.selectedProductCategoryId = myCat.productCategoryId
        this.selectedProductTitle = "ST eComm App Products List in " + myCat.productCategoryName + " Category"
        this.router.navigate(['/products/category', this.selectedProductCategoryId]);
        this.selectedProduct = null
    }


    myCatId: number
    myProductsFromHttp: Product[] = []

    ngOnInit(): void {

        /* This section shows that you can get products data from external server, using httpClient Module
            The Angular http.get returns an RxJS Observable        
            ***************************** 
   ***************************** */
      
        this.products$ = this.productService.getAllProducts()

        if (this.products$ != undefined) {

            this.products$.subscribe(data => this.myProductsFromHttp = data, err => console.log(err))
            console.log(this.myProductsFromHttp)
        }

        

        if (this.route) {
            this.myCatId = Number(this.route.snapshot.paramMap.get('catid'))
            if (this.myCatId > 0) {

                this.selectedProductCategoryId = this.myCatId
            }
            else {
                this.selectedProductTitle = "ST eComm App Products List in Clothing Category"
                this.selectedProductCategoryId = 1
            }

            this.selectedProduct = null
        }
        else {
            this.selectedProductTitle = "ST eComm App Products List in Clothing Category"
            this.selectedProductCategoryId = 1
            this.selectedProduct = null

        }

    }



}

export class ProductCategoryMap {
    productId: number
    categoryId: number
}




