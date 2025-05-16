create table users (
	user_id serial primary key,
	name varchar(128),
	email varchar(128),
	password varchar(128),
	mobile varchar(30),
	birth_date date,
	gender varchar(6),
	address varchar(256),
	father_name varchar(128),
	mother_name varchar(128),
	role varchar(10),
	date_created timestamp not null default now()
);

create table classes (
	class_id serial primary key,
	class_name varchar(30)
);

create table class_enrollment (
	class_id int references classes(class_id) on delete cascade,
	user_id int references users(user_id) on delete cascade,
	primary key (class_id, user_id)
);

create table subjects (
	subject_id serial primary key,
	subject_name varchar(128),
	class_id int references classes(class_id) on delete cascade
);

create table subject_enrollment (
	subject_id int references subjects(subject_id) on delete cascade,
	user_id int references users(user_id) on delete cascade,
	primary key (subject_id, user_id)
);

create table question_bank (
	question_id serial primary key,
	user_id int references users(user_id) on delete cascade,
	class_id int references classes(class_id) on delete cascade,
	subject_id int references subjects(subject_id) on delete cascade,
	question_number int,
	question_text text,
	full_marks int
);

create table answers (
	answer_id serial primary key,
	question_id int references question_bank(question_id) on delete cascade,
	correct_option text,
	option_2 text,
	option_3 text,
	option_4 text
);