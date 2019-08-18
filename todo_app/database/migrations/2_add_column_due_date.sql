-- +goose Up
alter table task add column due_date date;

-- +goose Down
alter table task drop column due_date;