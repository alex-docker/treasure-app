-- +goose Up
create table comment (
    id int(10) unsigned not null auto_increment,
    user_id int(10) unsigned not null,
    article_id int(10) unsigned not null,
    body text not null,
    primary key (id),
    constraint comment_fk_user foreign key (user_id) references user(id),
    constraint comment_fk_article foreign key (article_id) references article(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- +goose Down
drop table comment;