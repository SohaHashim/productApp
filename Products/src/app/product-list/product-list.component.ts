import { Component, OnInit } from '@angular/core';
import {ProductModel} from './product.model';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {EditProductComponent} from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title:String="Product-List";
  products: ProductModel[];
  productitem: EditProductComponent;
  imageWidth:number = 50;
  imageMargin: number = 2;

  showImage: boolean = false;

  constructor(private productService: ProductService,private router:Router) { }
  //productItem = new ProductModel(product)
  toggleImage(): void{
    this.showImage = !this.showImage;
  }
  ngOnInit(): void {
    this.productService.getproducts().subscribe((data)=>{
      this.products=JSON.parse(JSON.stringify(data));
    })
  }
  deleteProduct(id){
    console.log(id);
    this.productService.deleteProductData(id);
    console.log("called");
    location.reload();
  }
  onEdit(id){
    console.log(id);
    this.router.navigate(['/edit',id]);
    // this.productService.editproduct(product)
    // .subscribe(data=> {
    //   console.log(data);
    //   var productdata =JSON.parse(JSON.stringify(data));
    //   console.log(productdata);
    //   this.productitem.productItem = productdata.productId;
    // })
    
    
    //this.productService.selectedProduct = product;
  }
  
}
