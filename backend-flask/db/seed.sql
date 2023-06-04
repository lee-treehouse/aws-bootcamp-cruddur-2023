
-- this file was manually created
INSERT INTO public.users (display_name, email, handle, cognito_user_id)
VALUES
  ('Andrew Brown', 'leentaylor+andrewbrown@gmail.com', 'andrewbrown' ,'MOCK'),
  ('Alt Brown','andrew@cloudprojectbootcamp.com' , 'altbrown' ,'MOCK'),
  ('Andrew Bayko', 'leentaylor+andrewbayko@gmail.com', 'bayko' ,'MOCK'),
  ('Lee Taylor', 'leentaylor@gmail.com', 'leecruds' ,'MOCK');

INSERT INTO public.activities (user_uuid, message, expires_at)
VALUES
  (
    (SELECT uuid from public.users WHERE users.handle = 'andrewbrown' LIMIT 1),
    'This was imported as seed data!',
    current_timestamp + interval '10 day'
  )