create database tiny_url;

use tiny_url;

create table url (
    int_id int primary key auto_increment,
    vch_original_url varchar(255) not null,
    vch_shorted_url varchar(255) not null
);