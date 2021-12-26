import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopService } from './shop.service';
import { Product } from './shop.type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products$: Observable<Product[]>;
  filters: Record<string, string>;

  constructor(private service: ShopService, private ar: ActivatedRoute, private router: Router) {
    const filters: Record<string, string> = ar.snapshot.paramMap.keys.reduce((acc, key) => ({ ...acc, [key]: ar.snapshot.paramMap.get(key) }), {});
    this.filters = filters;
    this.products$ = service.getProducts(filters);
  }

  ngOnInit(): void {
  }

  handleRemove(param: { key: string; value: string }) {
    const paramMap = this.ar.snapshot.paramMap;
    const params: Record<string, string | null> = {}

    paramMap.keys.filter(k => k !== param.key).forEach(k => (params[k] = paramMap.get(k)));

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/shop', params]))
  }

}
