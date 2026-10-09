import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import type { Product } from './models/models.js';
import { CreateProductDto } from './models/CreateProductDto.dto.js';

const products: Product[] = [
  {
    "name": "Vezeték nélküli egér",
    "category": "elektronika",
    "price": 8990,
    "stock": 12
  },
  {
    "name": "Programozás kezdőknek",
    "category": "könyv",
    "price": 6490,
    "stock": 4
  },
  {
    "name": "Mechanikus billentyűzet",
    "category": "elektronika",
    "price": 24990,
    "stock": 3
  },
  {
    "name": "Fekete kapucnis pulóver",
    "category": "ruházat",
    "price": 12990,
    "stock": 8
  },
  {
    "name": "Catan társasjáték",
    "category": "játék",
    "price": 11990,
    "stock": 0
  },
  {
    "name": "USB-C töltőkábel",
    "category": "elektronika",
    "price": 4990,
    "stock": 25
  },
  {
    "name": "Adidas sportcipő",
    "category": "ruházat",
    "price": 27990,
    "stock": 2
  },
  {
    "name": "A kis herceg",
    "category": "könyv",
    "price": 3990,
    "stock": 15
  },
  {
    "name": "LEGO City rendőrségi állomás",
    "category": "játék",
    "price": 34990,
    "stock": 5
  },
  {
    "name": "Bluetooth hangszóró",
    "category": "elektronika",
    "price": 15990,
    "stock": 7
  }
]


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      data: products.toSorted((a, b) => a.price - b.price)
    }
  }

  @Get("/filter")
  @Render('filter')
  getFilter(@Query("category") category: string) {
    return { data: products.filter(item => item.category == category).toSorted((a, b) => b.price - a.price) }
  }

  @Get("/new")
  @Render('new')
  getNew() {
    return {

    }
  }

  @Post("/new")
  @Render('new')
  postNew(@Body() body: CreateProductDto) {
    products.push(body as Product)
    return {
      success: true
    }
  }

  @Get("/stats")
  @Render('stats')
  getStats() {
    return {
      sumStock: products.reduce((a, b) => { return a + b.stock }, 0),
      avgPrice: Math.round(products.reduce((a, b) => { return a + b.price }, 0) / products.length),
      minPrice: Math.min(...products.map(item => item.price)),
      maxPrice: Math.max(...products.map(item => item.price))
    }
  }
}
