-- +goose Up
create table tag (
    id int(10) unsigned not null auto_increment,
    name varchar(20) not null,
    primary key (id)
);

create table article_tag (
    id int(10) unsigned not null auto_increment,
    article_id int(10) unsigned not null,
    tag_id int(10) unsigned not null,
    primary key (id),
    constraint article_tag_fk_article foreign key (article_id) references article(id),
    constraint article_tag_fk_tag foreign key (tag_id) references tag(id)
);

-- +goose Down
drop table article_tag;
drop table tag;