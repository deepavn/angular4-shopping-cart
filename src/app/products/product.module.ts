import { ModuleWithProviders, NgModule, Pipe, PipeTransform } from '@angular/core';

import { RouterModule, ActivatedRoute, Routes } from '@angular/router';

import { ProductHomeComponent } from './product-home.component';
import { ProductDetailsComponent } from './product-details.component';
import { ProductListComponent } from './product-list.component';
import { ProductStoreComponent } from "./product-store.component";
import { ProductService } from "./product.service";

import { CartService } from '../cart/cart.service';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbsModule } from "ng2-breadcrumbs";

// Import Http from @angular/common/http
import { Http, Response, HttpModule} from '@angular/http';

/* Custom Pipes */
import { AppSearchFilterPipe } from '../shared/app-filters.pipe';

const productRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'store', component: ProductStoreComponent },
    { path: 'products-home', component: ProductHomeComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'products/product-details/:id', component: ProductDetailsComponent },
    { path: 'products/category/:catid', component: ProductListComponent }
    //,    { path: '', redirectTo: 'home', pathMatch: 'full' }

]);

@NgModule({
    imports: [
        SharedModule
        , HttpModule
        , productRouting
    ],
    exports: [ProductHomeComponent, ProductDetailsComponent, ProductListComponent, ProductStoreComponent],
    declarations: [ProductHomeComponent, ProductDetailsComponent, ProductListComponent, ProductStoreComponent, AppSearchFilterPipe],
    providers: [ProductService, CartService]
})

export class ProductModule {

}