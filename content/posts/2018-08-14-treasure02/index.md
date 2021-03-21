---
templateKey: blog-post
title: "Treasure2018 2日目 Golang"
date: 2018-08-14
slug: treasure02
published: true
unlisted: false
language: ja
cover: ../2018-09-03-summer-internship-2018/all.jpg
imageShare: ../2018-09-03-summer-internship-2018/all.jpg
tags:
  - internship
  - treasure
---

#### 前回の記事

[Treasure2018 1 日目](https://yoshikawa.dev/treasure01/)

## Treasure2018 2 日目

今日は Golang 入門 2 日目

### やったこと

簡単な Web アプリを Golang で書けることが出来た 🎉🎉

TODO アプリの拡張。

SQL と Golang を繋げる作業。

SQL を叩いて Golang でパースすることが出来ました。

### わからなかったところ

最後の TODO アプリの検索の仕方で手間取りました。

title と status で検索したかったけど、片方だけの検索しか出来なかった。

**title と status の同時検索が出来なかった。**

```shell
curl http://localhost:8080/api/todos/search?title=test\&completed=0
```

`controller/task.go`ファイル

```go
package controller

import (
	"encoding/json"
	"net/http"

	"github.com/voyagegroup/go-todo/model"

	"github.com/jmoiron/sqlx"
)

// Todo はTodoへのリクエストに関する制御をします
type Todo struct {
	DB *sqlx.DB
}

// GetはDBからユーザを取得して結果を返します
func (t *Todo) Get(w http.ResponseWriter, r *http.Request) error {
	todos, err := model.TodosAll(t.DB)
	if err != nil {
		return err
	}
	return JSON(w, 200, todos)
}

func (t *Todo) Put(w http.ResponseWriter, r *http.Request) error {
	var todo model.Todo
	if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
		return err
	}

	if err := TXHandler(t.DB, func(tx *sqlx.Tx) error {
		result, err := todo.Update(tx)
		if err != nil {
			return err
		}
		if err := tx.Commit(); err != nil {
			return err
		}
		todo.ID, err = result.LastInsertId()
		return err
	}); err != nil {
		return err
	}

	return JSON(w, http.StatusOK, todo)
}

// PostはタスクをDBに追加します
// todoをJSONとして受け取ることを想定しています。
func (t *Todo) Post(w http.ResponseWriter, r *http.Request) error {
	var todo model.Todo
	if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
		return err
	}

	if err := TXHandler(t.DB, func(tx *sqlx.Tx) error {
		result, err := todo.Insert(tx)
		if err != nil {
			return err
		}
		if err := tx.Commit(); err != nil {
			return err
		}
		todo.ID, err = result.LastInsertId()
		return err
	}); err != nil {
		return err
	}

	return JSON(w, http.StatusCreated, todo)
}

func (t *Todo) Delete(w http.ResponseWriter, r *http.Request) error {
	var todo model.Todo
	if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
		return err
	}

	if err := TXHandler(t.DB, func(tx *sqlx.Tx) error {
		_, err := todo.Delete(tx)
		if err != nil {
			return err
		}
		return tx.Commit()
	}); err != nil {
		return err
	}

	return JSON(w, http.StatusOK, todo)
}

func (t *Todo) Toggle(w http.ResponseWriter, r *http.Request) error {
	var todo model.Todo

	if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
		return err
	}

	if err := TXHandler(t.DB, func(tx *sqlx.Tx) error {
		_, err := todo.Toggle(tx)
		if err != nil {
			return err
		}
		return tx.Commit()
	}); err != nil {
		return err
	}

	return JSON(w, http.StatusOK, todo)
}

func (t *Todo) Search(w http.ResponseWriter, r *http.Request) error {
	title := r.URL.Query().Get("title")
	completed := r.URL.Query().Get("completed")

	todo, err := model.SearchByCompleted(t.DB, completed)
	if err != nil {
		return err
	}

	return JSON(w, http.StatusOK, todo)
}
```

`model/task.go` ファイル

```go
package model

import (
	"database/sql"
	"time"

	"github.com/jmoiron/sqlx"
)

// Todoは管理するタスク
type Todo struct {
	ID        int64      `db:"todo_id" json:"id"`
	Title     string     `json:"title"`
	Completed bool       `json:"completed"`
	Created   *time.Time `json:"created"`
	Updated   *time.Time `json:"updated"`
}

func TodosAll(dbx *sqlx.DB) (todos []Todo, err error) {
	if err := dbx.Select(&todos, "select * from todos"); err != nil {
		return nil, err
	}
	return todos, nil
}

func TodoOne(dbx *sqlx.DB, id int64) (*Todo, error) {
	var todo Todo
	if err := dbx.Get(&todo, `
	select * from todos where todo_id = ?
	`, id); err != nil {
		return nil, err
	}
	return &todo, nil
}

// TodosToggleAllは全部のtoggleのステータスをトグルします
func TodosToggleAll(tx *sqlx.Tx, checked bool) (sql.Result, error) {
	stmt, err := tx.Prepare(`
	update todos set completed = ?
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(checked)
}

func (t *Todo) Update(tx *sqlx.Tx) (sql.Result, error) {
	stmt, err := tx.Prepare(`
	update todos set title = ? where todo_id = ?
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(t.Title, t.ID)
}

func (t *Todo) Insert(tx *sqlx.Tx) (sql.Result, error) {
	stmt, err := tx.Prepare(`
	insert into todos (title, completed)
	values(?, ?)
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(t.Title, t.Completed)
}

// Toggle は指定されたタスクについて現在の状態と入れ替えます。
func (t *Todo) Toggle(tx *sqlx.Tx) (sql.Result, error) {
	stmt, err := tx.Prepare(`
	update todos set completed=?
	where todo_id=?
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(!t.Completed, t.ID)
}

func (t *Todo) Delete(tx *sqlx.Tx) (sql.Result, error) {
	stmt, err := tx.Prepare(`delete from todos where todo_id = ?`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(t.ID)
}

// TodosDeleteAllはすべてのタスクを消去します。
func TodosDeleteAll(tx *sqlx.Tx) (sql.Result, error) {
	stmt, err := tx.Prepare(`delete from todos where completed = 1`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec()
}

func SearchByTitle(dbx *sqlx.DB, title string) ([]*Todo, error) {
	var todos []*Todo

	if err := dbx.Select(&todos, "select * from todos where title = ?", title); err != nil {
		return nil, err
	}

	return todos, nil
}

func SearchByCompleted(dbx *sqlx.DB, completed string) ([]*Todo, error) {
	var todos []*Todo

	if err := dbx.Select(&todos, "select * from todos where completed = ?", completed); err != nil {
		return nil, err
	}

	return todos, nil
}
```

`server.go` に以下を追記

```go
router.Handle("/api/todos/search", handler(todo.Search)).Methods("GET")
```

### memo

SQL の使い方は以下の URL を参考にする。

[https://github.com/go-sql-driver/mysql/wiki/Examples](https://github.com/go-sql-driver/mysql/wiki/Examples)

[http://go-database-sql.org/accessing.html](http://go-database-sql.org/accessing.html)

[https://github.com/jmoiron/sqlx](https://github.com/jmoiron/sqlx)

[https://github.com/variadico/scaneo](https://github.com/variadico/scaneo)

#### 次回の記事

[Treasure2018 3 日目](https://yoshikawa.dev/treasure03/)
