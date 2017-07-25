## /product/list.do

> request

```
categoryId /keyword
pageNum(default=1)
pageSize(default=10)
orderBy(default='')：排序参数，例如price_desc、price_asc
```
> response

### success

```
{ 
    "status": 0,
    "data": {
        "pageNum": 1,
        "pageSize": 10,
        "size": 2,
        "orderBy": null,
        "startRow": 1,
        "endRow": 2,
        "total": 2,
        "pages":1,
        "list": [
            {
                "id": 26,
                "categoryId": 100002,
                "name": "Apple Phone,
                "subtitle": "xxx",
                "mainImage": "xxx",
                "price": xxx,
                "status": 1,
                "imageHost": "http://img.happymmall.com/"
            },
             {
                "id": 28,
                "categoryId": 100012,
                "name": "Apple Phone,
                "subtitle": "xxx",
                "mainImage": "xxx",
                "price": xxx,
                "status": 1,
                "imageHost": "http://img.happymmall.com/"
            }
        ],
        "firstPage": 1,
        "prevPage": 0,
        "nextPage": 0,
        "lastPage": 1,        
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": false,
        "hasNextPage": false,
        "navigatePages": 8,
        "navigatePageNums": [
            1
        ]
    }
}
```

### fail

```
{
    "status": 1,
    "msg": "参数错误",
}
```


## /product/detail.do

> request

productId

> response

### success

```
{
    "status": 0,
    "data": {
        "id": 2,
        "catogoryId": 2,
        "name": "oppo R8",
        "subtitle": "opp 促销进行中",
        "mainImage": "xxx",
        "subImage": "xxx",
        "detail": "richtext",
        "price": 222,
        "stock": 2,
        "status": 1,
        "createTime": 2,
        "updateTime": 2,
    }
}
```

### fail

```
{
    "status": 1,
    "msg": "该商品已下架或删除"
}
```
### fail

```
{
    "status": 1,
    "msg": "参数错误",
}
```


## /cart/add.do

> request

productId, count

> response

### success

```
{
    "status": 0,
    "data": {
        <!--"id": 2,
        "catogoryId": 2,
        "name": "oppo R8",
        "subtitle": "opp 促销进行中",
        "mainImage": "xxx",
        "subImage": "xxx",
        "detail": "richtext",
        "price": 222,
        "stock": 2,
        "status": 1,
        "createTime": 2,
        "updateTime": 2,-->
    }
}
```

### fail

```
{
    "status": 10,
    "msg": "用户未登录，请登录"
}
```

