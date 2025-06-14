create table users (
	user_id serial primary key,
	fullname varchar(128),
	email varchar(128) unique,
	password varchar(256),
	image varchar(256),
	refreshToken text,
	role varchar(10),
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

create table questions (
	question_id serial primary key,
	class_id int references classes(class_id) on delete cascade,
	subject_id int references subjects(subject_id) on delete cascade,
	question_text text not null,
	full_marks int not null
);

create table answer_options (
	option_id serial primary key,
	question_id int references questions(question_id) on delete cascade,
	option_text text not null,
	is_correct boolean not null
);
create unique index one_correct_option_per_question on answer_options(question_id) where is_correct = true;
create index idx_answer_options_question_id on answer_options(question_id);

create table posts (
	post_id serial primary key,
	post_text text not null,
	user_id int references users(user_id) on delete cascade,
	class_id int references classes(class_id) on delete cascade,
	subject_id int references subjects(subject_id) on delete cascade,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

create table post_comments (
	comment_id serial primary key,
	comment_text text not null,
	post_id int references posts(post_id) on delete cascade,
	user_id int references users(user_id) on delete cascade,
	created_at timestamp not null default now()
);