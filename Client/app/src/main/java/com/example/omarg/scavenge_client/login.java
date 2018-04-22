package com.example.omarg.scavenge_client;

import android.content.Intent;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TextInputLayout;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class login extends AppCompatActivity
{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        final String username = "admin";
        final String password = "password";

        //Button to initialize the qr scanner
        Button b1 = this.findViewById(R.id.Login);
        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TextInputLayout name = findViewById(R.id.username);
                TextInputLayout pass = findViewById(R.id.password);
                if(name.getEditText().getText().toString().equals(username) && pass.getEditText().getText().toString().equals(password))
                {
                    startActivity(new Intent(login.this, com.example.omarg.scavenge_client.MainActivity.class));
                }
                else
                {
                    Snackbar.make(findViewById(R.id.myCoordinatorLayout), "Invalid username or password",
                            Snackbar.LENGTH_SHORT)
                            .show();                }

            }
        });


    }
}
