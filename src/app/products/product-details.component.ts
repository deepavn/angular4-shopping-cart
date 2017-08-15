import { Component, OnInit } from '@angular/core'
import { Product } from './product.model'
import { products } from './product.data'
import { ProductCategory } from "./product-category.model"
import { productCategories } from "./product-category.data"
import { ProductService } from "./product.service"
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart-item.model'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'product-details',
    templateUrl: './product-details.html'

})

export class ProductDetailsComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private cartService: CartService) {

    }
    myProduct: Product
    myProductCategory: ProductCategory
    myId: number
  
    ngOnInit(): void {

        this.myId = Number(this.route.snapshot.paramMap.get('id'))

        this.myProduct = this.productService.getProductDetails(this.myId)
        if (this.myProduct)
            this.myProductCategory = this.productService.getProductCategoryDetails(this.myProduct.productCategoryId)

    }



}