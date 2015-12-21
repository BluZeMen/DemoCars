openshift-python33-django17
===========================

Almost working example of django 1.7 on openshift python 3.3 cartridge:

To install:
-----------
1. Create python 3.3 cartridge on openshift (using rhc or by openshift website)

2. enter your app directory or clone your openshift project into your local folder (i.e. python33)

3. add remote repository :
   ```
   git remote add github git@github.com:szymon-m/openshift-python33-django17.git
   ```
4. execute pull:
   ```
   git pull -s recursive -X theirs github master
   ```
5. push your openshift repo : 
   ```
   git push
   ```

Next steps:
-----------

1. log in on openshift using ssh (using your credentials)
2. activate your virtualenv by : 
   ```
   source python/virtenv/venv/bin/activate
   ```
   
3. switch dir to : 
   ```
   cd ~/app-root/repo/wsgi/
   ```
4. to properly handle static file (i.e. for admin panel) run : 
   ```
   python manage.py collectstatic
   ```
5. in order to create superuser account and log in to admin run : 
   ```
   python manage.py syncdb
   ```

Some of these instruction should be placed in .openshift/action_hooks folder and executed during deployment process.


