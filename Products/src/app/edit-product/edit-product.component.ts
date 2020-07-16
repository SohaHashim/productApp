import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router} from '@angular/router'
import { ProductModel } from '../product-list/product.model';
import { ActivatedRoute } from '@angular/router';
//import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [ProductService]

})
export class EditProductComponent implements OnInit {
  title: String="Edit product";
  id='';
  product=<any>('');
  productItem= new ProductModel(null,null,null,null,null,null,null,null);

  constructor(private productService: ProductService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id=params['id'];
      //this.id=parameterMap.get('id');
      console.log(this.id)
    })
  this.productService.editproduct(this.id).subscribe(res=>{
    console.log(res);
    //this.product=JSON.parse(JSON.stringify(res));
    //var productsdata=JSON.parse(res);
    this.productItem=JSON.parse(JSON.stringify(res));
    console.log(this.productItem);
    //var productsdata=JSON.parse(JSON.stringify(res));
    //console.log(this.product);
    //console.log(productsdata);
    //this.product.productId = productsdata.productId;
    //this.product.productName = productsdata.productName;

  })
   
  }
//  onSubmit(form){
//    this.productService.putProduct(form.value)
//      alert("updated");
//      location.reload();  
//  }
 updatedata(id,item){
   this.productService.updateProduct(id,item);
   alert("success");
   this.router.navigate(['/']);
  //  location.reload();
 }

}
