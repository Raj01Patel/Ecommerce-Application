# E-Commerce Application Backend API Documentation 

### Welcome to the documentation for the E-Commerce Application Backend API. This document provides an overview of the available endpoints, their functionalities, and usage instructions.
---
## Introduction
This API serves as the backend for our E-Commerce Application, providing various endpoints to manage products, orders, users, and authentication.

**Base URL**: https://ecommerce-application-72on.onrender.com
---
#### SignUp End=Point
-> POST /api/v1/user/signUp

#### Login End-Point
-> POST /api/v1/user/login

---

## Product API End-Point

(product-list)
-> GET /api/v1/product/list?pagesize=10&pageno=1

(product-create)
-> POST /api/v1/product/create
 
(product-edit)
-> POST /api/v1/product/edit/{productID}
-> Ex:- POST /api/v1/product/edit/66a0a346873a55792cdfb3cf

(product-delete)
-> POST /api/v1/product/delete/{productID}
-> Ex:- POST /api/v1/product/delete/66a0a346873a55792cdfb3d0

---

## Wishlist API End-Point

(Add-wishlist)
-> POST /api/v1/wishlist/add

(Remove-wishlist)
-> POST /api/v1/wishlist/remove

(Get-wishlist)
-> GET /api/v1/wishlist/ 

---

## Blogpost API End-Point

(Post-create)
-> POST /posts/create

(post-list)
-> GET /posts

(post-edit)
-> PUT /posts/edit/{postId}
-> Ex:- PUT /posts/edit/66a4956ae99d83fd5df1e9e8

(post-delete)
-> PUT /posts/delete/{postId}
-> Ex:- PUT /posts/delete/66a4956ae99d83fd5df1e9e8
