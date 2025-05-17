create table users (
	user_id serial primary key,
	name varchar(128),
	email varchar(128) unique,
	password varchar(256),
	mobile varchar(30),
	birth_date date,
	gender varchar(10) constraint gender_check check (gender in ('Male', 'Female', 'Others')),
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
	class_id int references classes(class_id) on delete cascade,
	subject_id int references subjects(subject_id) on delete cascade,
	question_text text,
	full_marks int
);

create table answer_options (
	option_id serial primary key,
	question_id int references question_bank(question_id) on delete cascade,
	option_text text,
	is_correct boolean
);
create unique index one_correct_option_per_question on answer_options(question_id) where is_correct = true;
create index idx_answer_options_question_id on answer_options(question_id);

