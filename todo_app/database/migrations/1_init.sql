-- +goose Up
create table task (
    id int(10) not null auto_increment,
    title varchar(30) not null,
    content varchar(100) not null,
    created_at datetime not null default current_timestamp ,
    updated_at datetime not null default current_timestamp on update current_timestamp ,
    primary key (id)
);

-- +goose Down
drop table task;