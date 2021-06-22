# fancy-todo-server

fancy-todo-server

{
	"info": {
		"_postman_id": "b9304464-14b0-457b-88bd-7be76eda1b99",
		"name": "Todo App",
		"description": "# Todo App\nfancy-todo-server",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "localhost:3000/todos",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "localhost:3000/todos",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"todos"
					]
				},
				"description": "Show Todos"
			},
			"response": [
				{
					"name": "localhost:3000/todos",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": ""
						},
						"url": {
							"raw": "localhost:3000/todos",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"todos"
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "187"
						},
						{
							"key": "ETag",
							"value": "W/\"bb-IM3S23G2/Ak2jUK32s3iJFq0A0Q\""
						},
						{
							"key": "Date",
							"value": "Tue, 22 Jun 2021 01:30:22 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "[\n    {\n        \"id\": 1,\n        \"title\": \"Test\",\n        \"desc\": \"Test Todo App\",\n        \"status\": \"On Progress\",\n        \"due_date\": \"2021-06-30T00:00:00.000Z\",\n        \"createdAt\": \"2021-06-21T23:22:02.155Z\",\n        \"updatedAt\": \"2021-06-21T23:22:02.155Z\"\n    }\n]"
				}
			]
		},
		{
			"name": "localhost:3000/todos",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "localhost:3000/todos",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"todos"
					]
				},
				"description": "Add Todo"
			},
			"response": [
				{
					"name": "localhost:3000/todos",
					"originalRequest": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "title",
									"value": "tes2",
									"type": "text"
								},
								{
									"key": "status",
									"value": "new",
									"type": "text"
								},
								{
									"key": "due_date",
									"value": "2021-06-22",
									"type": "text"
								},
								{
									"key": "desc",
									"value": "Test Post Man",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "localhost:3000/todos",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"todos"
							]
						}
					},
					"status": "Created",
					"code": 201,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "166"
						},
						{
							"key": "ETag",
							"value": "W/\"a6-WTP8hWBTz7/Uk2g3l4Cx5rGEYSg\""
						},
						{
							"key": "Date",
							"value": "Tue, 22 Jun 2021 01:35:37 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "{\n    \"id\": 4,\n    \"title\": \"tes2\",\n    \"status\": \"new\",\n    \"due_date\": \"2021-06-22T00:00:00.000Z\",\n    \"updatedAt\": \"2021-06-22T01:35:37.476Z\",\n    \"createdAt\": \"2021-06-22T01:35:37.476Z\",\n    \"desc\": null\n}"
				}
			]
		},
		{
			"name": "localhost:3000/todos/:id",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "localhost:3000/todos/:id",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"todos",
						":id"
					],
					"variable": [
						{
							"key": "id"
						}
					]
				},
				"description": "Read Detail Todo"
			},
			"response": [
				{
					"name": "localhost:3000/todos/:id",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": ""
						},
						"url": {
							"raw": "localhost:3000/todos/:4",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"todos",
								":4"
							],
							"variable": [
								{
									"key": "4",
									"value": ""
								}
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "354"
						},
						{
							"key": "ETag",
							"value": "W/\"162-/k1zhI1oy8R5Bh5jA5BMQSEqr/U\""
						},
						{
							"key": "Date",
							"value": "Tue, 22 Jun 2021 01:35:54 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "[\n    {\n        \"id\": 1,\n        \"title\": \"Test\",\n        \"desc\": \"Test Todo App\",\n        \"status\": \"On Progress\",\n        \"due_date\": \"2021-06-30T00:00:00.000Z\",\n        \"createdAt\": \"2021-06-21T23:22:02.155Z\",\n        \"updatedAt\": \"2021-06-21T23:22:02.155Z\"\n    },\n    {\n        \"id\": 4,\n        \"title\": \"tes2\",\n        \"desc\": null,\n        \"status\": \"new\",\n        \"due_date\": \"2021-06-22T00:00:00.000Z\",\n        \"createdAt\": \"2021-06-22T01:35:37.476Z\",\n        \"updatedAt\": \"2021-06-22T01:35:37.476Z\"\n    }\n]"
				}
			]
		},
		{
			"name": "localhost:3000/todos/:id",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "localhost:3000/todos/:id",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"todos",
						":id"
					],
					"variable": [
						{
							"key": "id"
						}
					]
				},
				"description": "Update All Todo"
			},
			"response": []
		},
		{
			"name": "localhost:3000/todos/:id",
			"request": {
				"method": "PATCH",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "localhost:3000/todos/:id",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"todos",
						":id"
					],
					"variable": [
						{
							"key": "id"
						}
					]
				},
				"description": "Update Status "
			},
			"response": [
				{
					"name": "localhost:3000/todos/:id",
					"originalRequest": {
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "status",
									"value": "done",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "localhost:3000/todos/1",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"todos",
								"1"
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "180"
						},
						{
							"key": "ETag",
							"value": "W/\"b4-D6NdVMK8koE6dg+R9VWd0JI2O0E\""
						},
						{
							"key": "Date",
							"value": "Tue, 22 Jun 2021 01:44:28 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "[\n    {\n        \"id\": 1,\n        \"title\": \"Test\",\n        \"desc\": \"Test Todo App\",\n        \"status\": \"done\",\n        \"due_date\": \"2021-06-30T00:00:00.000Z\",\n        \"createdAt\": \"2021-06-21T23:22:02.155Z\",\n        \"updatedAt\": \"2021-06-22T01:44:28.757Z\"\n    }\n]"
				}
			]
		},
		{
			"name": "localhost:3000/todos/:id",
			"request": {
				"method": "DELETE",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "localhost:3000/todos/:id",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"todos",
						":id"
					],
					"variable": [
						{
							"key": "id"
						}
					]
				},
				"description": "Delete Todo"
			},
			"response": [
				{
					"name": "localhost:3000/todos/:id",
					"originalRequest": {
						"method": "DELETE",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": ""
						},
						"url": {
							"raw": "localhost:3000/todos/4",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"todos",
								"4"
							]
						}
					},
					"status": "Created",
					"code": 201,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "1"
						},
						{
							"key": "ETag",
							"value": "W/\"1-NWoZK3kTsExUV00Ywo1G5jlUKKs\""
						},
						{
							"key": "Date",
							"value": "Tue, 22 Jun 2021 01:42:46 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "1"
				}
			]
		}
	]
}